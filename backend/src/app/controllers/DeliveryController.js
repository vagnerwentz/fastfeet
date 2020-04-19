import * as Yup from 'yup';

import { format, parseISO } from 'date-fns';

import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class DeliveryController {
    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Dados Inválidos' });
        }

        const { recipient_id, deliveryman_id } = req.body;

        const recipient = await Recipient.findByPk(recipient_id);

        if (!recipient) {
            return res.status(401).json({ error: 'Recipient not found' });
        }
        const deliveryman = await Deliveryman.findByPk(deliveryman_id);

        if (!deliveryman) {
            return res.status(401).json({ error: 'Deliveryman not found' });
        }

        const delivery = await Order.create(req.body);

        return res.status(201).json(delivery);
    }

    async show(req, res) {
        const { deliveryman_id } = req.params;

        // Finding the delivery with the same id
        const deliveryman = await Deliveryman.findOne({
            where: {
                id: deliveryman_id,
            },
        });
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'This deliveryman does not exist.' });
        }
        const orders = await Order.findByPk(deliveryman_id, {
            where: {
                deliveryman_id,
                canceled_at: null,
                end_date: null,
            },
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
        });
        if (!orders) {
            return res.status(400).json({ error: 'Orders not fount' });
        }
        return res.json(orders);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date(),
            end_date: Yup.date(),
            signature_id: Yup.number(),
        });

        // Validations about the schema
        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validations fails' });
        }

        const { deliveryman_id, order_id } = req.params;
        const { start_date, end_date, signature_id } = req.body;

        const deliveryman = await Deliveryman.findByPk(deliveryman_id);
        const order = await Order.findOne({ where: { id: order_id } });

        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'This deliveryman does not exist.' });
        }

        if (!order) {
            return res
                .status(400)
                .json({ error: 'This order does not exist.' });
        }

        /**
         * Verifications when end_date is passed in
         */
        if (end_date) {
            /* Check if order has already been picked ended */
            const alreadyEnded = order.end_date;
            if (alreadyEnded) {
                return res.status(401).json({
                    error:
                        "Order has already been ended. You can no longer update it's end date.",
                });
            }
        }

        /**
         * Quick check for signature when closing an order
         */
        const hasSignature = signature_id;
        if (!hasSignature) {
            return res
                .status(401)
                .json({ error: 'Signature is required on closing orders' });
        }

        /**
         * Verification when start_date is passed in
         */
        if (start_date) {
            const alreadyPickedUp = order.start_date;
            if (alreadyPickedUp) {
                return res.status(401).json({
                    error:
                        "Order has already been picked up. You can no longer update it's start date",
                });
            }
        }

        /**
         * Pickups only beetwen 8am(8h da manhã) and 6pm(18h da tarde)
         * We can also use the same statement to say the day hasn't started yet
         * meaning we can reset the num_pickup as well
         */
        const startDateTime = format(parseISO(start_date), 'H');
        if (startDateTime > 18 || startDateTime < 8) {
            /* Reseting pickup counter */
            await deliveryman.update({ num_pickup: 0 });

            return res.status(401).json({
                error: 'You can only pickup an order between 8am and 6pm',
            });
        }

        /**
         * Max of 5 pickups per day
         */
        const pickupCounter = deliveryman.num_pickup;
        if (pickupCounter >= 5) {
            return res
                .status(400)
                .json({ error: 'Number of pickups exceeded (5 per day)' });
        }

        /**
         * Increments numbers of pickups
         */
        await deliveryman.increment('num_pickup');
        await order.update(req.body);
        return res.json(order);
    }
}

export default new DeliveryController();
