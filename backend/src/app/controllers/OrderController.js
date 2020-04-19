import * as Yup from 'yup';
import { format } from 'date-fns';
import { Op } from 'sequelize';

import pt from 'date-fns/locale/pt';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import Mail from '../../lib/Mail';

class OrderController {
    async store(req, res) {
        /**
         * OrderController.store => When the administrator
         * is registering an order with deliveryman X for a recipient Y
         */
        const schema = Yup.object().shape({
            recipient_id: Yup.number()
                .positive()
                .required(),
            deliveryman_id: Yup.number()
                .positive()
                .required(),
            product: Yup.string().required(),
        });

        // Validations about the schema
        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validations fails' });
        }

        // Validating if the deliveryman exist
        const { deliveryman_id } = req.body;
        const deliveryman = await Deliveryman.findByPk(deliveryman_id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'This deliveryman does not exist.' });
        }

        // Validating if the recipient exist
        const { recipient_id } = req.body;
        const recipient = await Recipient.findByPk(recipient_id);
        if (!recipient) {
            return res
                .status(400)
                .json({ error: 'This recipient does not exist.' });
        }

        const order = await Order.create(req.body);

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Nova encomenda',
            template: 'NewOrder',
            context: {
                deliveryman: deliveryman.name,
                created_at: format(
                    order.createdAt,
                    "'dia' dd 'de' MMMM', às' H:mm'h'",
                    { locale: pt }
                ),
                product: order.product,
                recipient: recipient.name,
                street: recipient.street,
                complement: recipient.complement,
                number: recipient.number,
                state: recipient.state,
                city: recipient.city,
                zip_code: recipient.zip_code,
            },
        });
        return res.json(order);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().positive(),
            deliveryman_id: Yup.number().positive(),
            product: Yup.string(),
        });

        // Validations about the schema
        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validations fails' });
        }

        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res
                .status(400)
                .json({ error: 'This order does not exist.' });
        }

        // Validating if the deliveryman exist
        const { deliveryman_id } = req.body;
        const deliveryman = await Deliveryman.findByPk(deliveryman_id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'This deliveryman does not exist.' });
        }

        if (order.canceled_at) {
            return res
                .status(401)
                .json({ error: `Order canceled at - ${order.canceled_at}` });
        }

        const { product, canceled_at } = await order.update(req.body);

        return res.json({ product, canceled_at });
    }

    async delete(req, res) {
        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order) {
            return res
                .status(400)
                .json({ error: 'This order does not exist.' });
        }

        await order.destroy();

        return res.json({
            message: `Order with ID ${id} was sucessfully removed.`,
        });
    }

    async index(req, res) {
        const { page = 1, limit = 10, q = '' } = req.query;

        const orders = await Order.findAndCountAll({
            where: {
                product: {
                    [Op.iLike]: `%${q}%`,
                },
            },
            offset: (page - 1) * limit,
            limit,
            attributes: [
                'id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
                'canceled_at',
            ],
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'name',
                        'street',
                        'number',
                        'complement',
                        'city',
                        'state',
                    ],
                },
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['path', 'url'],
                },
            ],
        });

        return res.json(orders);
    }
}

export default new OrderController();
