import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails!' });
        }

        const { email, password } = req.body;

        // Verificação se existe um usuário com este email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'User not found!' });
        }

        // Verificação de comparação de senha
        if (!(await user.checkPassword(password))) {
            res.status(401).json({ error: 'Password does not match!' });
        }

        const { id, name, is_admin } = user;

        return res.json({
            user: {
                id,
                name,
                email,
                is_admin,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
