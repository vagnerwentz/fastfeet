import Mail from '../../lib/Mail';

class DeliveryReadyMail {
    get key() {
        return 'DeliveryReadyMail';
    }

    async handle({ data }) {
        const { deliveryman, delivery, recipient } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'FastFeet | Encomenda pronta para retirada!',
            template: 'delivery_ready',
            context: {
                deliveryman,
                delivery,
                recipient,
            },
        });
    }
}

export default new DeliveryReadyMail();
