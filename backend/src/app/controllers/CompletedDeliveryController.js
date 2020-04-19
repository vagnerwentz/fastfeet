import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

class CompletedDeliveryController {
    async index(req, res) {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const deliveryman = await Deliveryman.findByPk(id);

        if (!deliveryman) {
            return res.status(401).json({ error: 'Entregador não encontrado' });
        }

        const orders = await Order.findAndCountAll({
            limit,
            offset,
            where: {
                deliveryman_id: id,
                canceled_at: null,
                end_date: {
                    [Op.ne]: null,
                },
            },
            attributes: {
                exclude: ['deliveryman_id'],
            },
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                },
            ],
        });

        return res.status(200).json(orders);
    }
}

export default new CompletedDeliveryController();
