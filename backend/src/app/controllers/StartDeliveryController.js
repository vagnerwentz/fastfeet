import {
    format,
    setSeconds,
    setMinutes,
    setHours,
    isBefore,
    isAfter,
} from 'date-fns';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class StatusDeliveryController {
    async update(req, res) {
        const { id } = req.params;
        const { deliveryman_id } = req.body;

        let order = await Order.findByPk(id, {
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                },
            ],
        });

        if (!order) {
            return res.status(400).json({ error: 'Encomenda não encontrada' });
        }

        const deliveryman = await Deliveryman.findByPk(deliveryman_id);

        if (!deliveryman) {
            return res.status(400).json({ error: 'Entregador não encontrado' });
        }

        const date = new Date();

        /* Horários de retirada permitidos: 8h às 18h */
        const initalTime = setSeconds(setMinutes(setHours(date, 7), 59), 59);
        const finalTime = setSeconds(setMinutes(setHours(date, 22), 0), 0);

        if (isBefore(date, initalTime) || isAfter(date, finalTime)) {
            return res.status(401).json({
                error:
                    'Retirada não permitida antes das 08:00 ou após às 18:00',
            });
        }

        const dateFormatted = format(new Date(), 'yyyy-MM-dd');

        const { count } = await Order.findAndCountAll({
            where: {
                deliveryman_id,
                start_date: dateFormatted,
            },
        });

        if (count >= 5) {
            return res
                .status(401)
                .json({ error: 'Limite de retiradas (5) excedido' });
        }

        order = await order.update({
            start_date: new Date(),
        });

        return res.status(200).json(order);
    }
}

export default new StatusDeliveryController();
