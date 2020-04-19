import Mail from '../../lib/Mail';

class DeliveryCancelMail {
    get key() {
        return 'DeliveryCancelMail';
    }

    async handle({ data }) {
        const { deliveryman, delivery, recipient, problem } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'FastFeet | Encomenda cancelada!',
            template: 'delivery_cancel',
            context: {
                deliveryman,
                delivery,
                recipient,
                problem,
            },
        });
    }
}

export default new DeliveryCancelMail();
