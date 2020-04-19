import User from '../models/User';

export default async (req, res, next) => {
    const userIsAdmin = await User.findByPk(req.userId);
    const [, str] = userIsAdmin.email.split('@');
    if (!(str === 'fastfeet.com')) {
        return res.status(401).json({
            error: 'To create a deliveryman you need to be an admin.',
        });
    }
    return next();
};
