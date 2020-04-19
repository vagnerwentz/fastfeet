import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class MobileSessionController {
    async show(req, res) {
        const { id } = req.params;

        const deliveryman = await Deliveryman.findByPk(id, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'url', 'path'],
                },
            ],
        });

        if (!deliveryman) {
            return res.status(400).json({ error: 'Entregador não encontrado' });
        }

        return res.status(200).json(deliveryman);
    }
}

export default new MobileSessionController();
