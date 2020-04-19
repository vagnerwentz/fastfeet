import { Op } from 'sequelize';
import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
    // Criação do destinatário
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number()
                .required()
                .positive(),
            complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.string().required(),
        });

        // Validação do schema do destinátario
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const {
            id,
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
        } = await Recipient.create(req.body);

        return res.json({
            id,
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
        });
    }

    // Atualização do destinatário
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().positive(),
            complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);
        if (!recipient) {
            return res
                .status(401)
                .json({ error: 'Recipient does not exists.' });
        }
        await recipient.update(req.body);

        const {
            name,
            street,
            number,
            complement,
            city,
            state,
            zip_code,
        } = await recipient.update(req.body);
        return res.json({
            id,
            name,
            street,
            number,
            complement,
            city,
            state,

            zip_code,
        });
    }

    async index(req, res) {
        const { page = 1, limit = 10, q = '' } = req.query;
        const recipient = await Recipient.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${q}%`,
                },
            },
            offset: (page - 1) * limit,
            limit,
        });
        // const recipient = await Recipient.findAll();
        return res.json(recipient);
    }

    async show(req, res) {
        const { id } = req.params;

        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            return res.stats(401).json({ error: 'User does not exist' });
        }
        return res.json(recipient);
    }

    async delete(req, res) {
        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);
        if (!recipient) {
            return res.stats(401).json({ error: 'User does not exist' });
        }
        await recipient.destroy();
        return res.json({ message: 'Recipient has been deleted' });
    }
}

export default new RecipientController();
