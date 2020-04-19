import { Op } from 'sequelize';
import * as Yup from 'yup';

import OrderIssue from '../models/OrderIssue';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
    async index(request, response) {
        let where = {
            canceled_at: null,
        };
        const { page = 1, limit = 10, q } = request.query;
        const offset = (page - 1) * limit;

        if (q) {
            where = {
                product: {
                    [Op.iLike]: `%${q}%`,
                },
            };
        }

        const deliveriesWithProblem = await OrderIssue.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: Order,
                    as: 'order',
                    where,
                    include: [
                        {
                            model: Deliveryman,
                            as: 'deliveryman',
                            include: [
                                {
                                    model: File,
                                    as: 'avatar',
                                },
                            ],
                        },
                        {
                            model: Recipient,
                            as: 'recipient',
                        },
                        {
                            model: File,
                            as: 'signature',
                        },
                    ],
                },
            ],
        });

        return response.status(200).json(deliveriesWithProblem);
    }

    async store(request, response) {
        const { id } = request.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return response
                .status(400)
                .json({ error: 'Entrega não encontrada' });
        }

        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: 'Dados inválidos' });
        }

        const { description } = request.body;

        const orderIssue = await OrderIssue.create({
            order_id: id,
            description,
        });

        return response.status(201).json(orderIssue);
    }

    async show(request, response) {
        const { id } = request.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return response
                .status(400)
                .json({ error: 'Encomenda não encontrada' });
        }

        const orderIssues = await OrderIssue.findAndCountAll({
            where: {
                order_id: id,
            },
        });

        return response.status(200).json(orderIssues);
    }
}

export default new DeliveryProblemController();
