import { Op } from 'sequelize';
import * as Yup from 'yup';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .required()
                .email(),
            avatar_id: Yup.number(),
        });

        // Validação do schema para a criação
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        // Validação de email existente
        const deliverymanExists = await Deliveryman.findOne({
            where: { email: req.body.email },
        });
        if (deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Deliveryman already exists.' });
        }

        const { id, name, email, avatar_id } = await Deliveryman.create(
            req.body
        );
        return res.json({ id, name, email, avatar_id });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            avatar_id: Yup.number(),
        });

        // Validação do schema para a atualização
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { email, avatar_id } = req.body;

        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if (Number(avatar_id) !== Number(deliveryman.avatar_id)) {
            const avatar = await File.findByPk(avatar_id);

            avatar.destroy();

            promisify(fs.unlink)(
                path.resolve(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'tmp',
                    'uploads',
                    avatar.path
                )
            );
        }

        if (email && email !== deliveryman.email) {
            // Validação de email existente
            const deliverymanExists = await Deliveryman.findOne({
                where: { email },
            });
            if (deliverymanExists) {
                return res
                    .status(400)
                    .json({ error: 'Deliveryman already exists.' });
            }
            const [, str] = deliveryman.email.split('@');
            if (!(str === 'fastfeet.com')) {
                return res
                    .status(401)
                    .json({ error: 'Unauthorized to update the email.' });
            }
        }

        await deliveryman.update(req.body);

        const { id, name, avatar } = await Deliveryman.findByPk(req.userId, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        return res.json({
            id,
            name,
            email,
            avatar,
        });
    }

    async index(req, res) {
        const { page = 1, limit = 10, q = '' } = req.query;

        const deliveryman = await Deliveryman.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${q}%`,
                },
            },
            offset: (page - 1) * limit,
            limit,
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url'],
                },
            ],
        });
        return res.json(deliveryman);
    }

    async show(req, res) {
        const { id } = req.params;
        const deliveryman = await Deliveryman.findByPk(id, {
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url'],
                },
            ],
        });
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists.' });
        }
        return res.json(deliveryman);
    }

    async delete(req, res) {
        const { id } = req.params;
        const deliveryman = await Deliveryman.findByPk(id);
        const deliverymanAvatar = await File.findByPk(deliveryman.avatar_id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists.' });
        }
        if (deliverymanAvatar) {
            await deliverymanAvatar.destroy();
        }
        await deliveryman.destroy();

        return res.json({ message: 'Deliveryman has been deleted' });
    }
}

export default new DeliverymanController();
