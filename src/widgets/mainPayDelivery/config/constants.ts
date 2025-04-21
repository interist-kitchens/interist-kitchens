import sbp from '@/app/assets/pay-delivery/sbp.svg';
import halva from '@/app/assets/pay-delivery/halva.svg';
import mir from '@/app/assets/pay-delivery/mir.svg';
import Dostavka from '@/app/assets/pay-delivery/Dostavka.svg';

export const PAY_DELIVERY_CONFIG = [
    {
        id: 1,
        title: 'Способы оплаты',
        description:
            'Оплачивайте картой онлайн, через систему СБП, безналичным переводом для юридических лиц или наличными.',
        images: [sbp, halva, mir],
        link: '',
    },
    {
        id: 2,
        title: 'Рассрочка без переплат',
        description:
            'Покупайте сейчас — платите потом! Без первого взноса и переплат.',
        images: [],
        link: '',
    },
    {
        id: 3,
        title: 'Доставка по России',
        description: 'Доставка кухни во все города',
        images: [Dostavka],
        link: '',
    },
];
