import OrderIssue from '../models/OrderIssue';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import Queue from '../../lib/Queue';
import DeliveryCancelMail from '../jobs/DeliveryCancelMail';

class CancelDeliveryController {
    async update(request, response) {
        const { id } = request.params;

        const orderIssue = await OrderIssue.findByPk(id);

        if (!orderIssue) {
            return response
                .status(400)
                .json({ error: 'Problema não encontrado' });
        }

        let order = await Order.findByPk(orderIssue.delivery_id);

        if (!order) {
            return response
                .status(400)
                .json({ error: 'Encomenda não encontrada' });
        }

        if (order.canceled_at) {
            return response
                .status(401)
                .json({ error: 'A encomenda já está cancelada' });
        }

        order = await order.update({
            canceled_at: new Date(),
        });

        const recipient = await Recipient.findByPk(order.recipient_id);
        const deliveryMan = await Deliveryman.findByPk(order.deliveryman_id);

        await Queue.add(DeliveryCancelMail.key, {
            deliveryman: deliveryMan,
            recipient,
            order,
            problem: orderIssue,
        });

        return response.status(200).json(order);
    }
}

export default new CancelDeliveryController();
