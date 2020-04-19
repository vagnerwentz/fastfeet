import * as Yup from 'yup';

import Order from '../models/Order';

class EndDeliveryController {
    async update(req, res) {
        const { id } = req.params;

        const schema = Yup.object().shape({
            signature_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Dados inválidos' });
        }

        const { signature_id } = req.body;

        let order = await Order.findByPk(id);

        if (!order) {
            return res.status(400).json({ error: 'Encomenda não encontrada' });
        }

        if (!order.start_date) {
            return res
                .status(401)
                .json({ error: 'A encomenda não possui data de retirada' });
        }

        order = await order.update({
            signature_id,
            end_date: new Date(),
        });

        return res.status(200).json(order);
    }
}

export default new EndDeliveryController();
