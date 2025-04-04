import { paths } from '@/shared/routing';

export const sliderContent = {
    slide1: {
        title: 'Лаборатория идеальной кухни',
        buttonText: 'Перейти к выбору',
        href: paths.home,
    },
    slide2: {
        title: 'Впервые в России кухни InterIst',
        subTitle: 'Во всех кухонных студиях InterIst',
        buttonText: 'Рассчитать стоимость кухни',
        href: paths.home,
        informerTitle: 'от 60 000 ₽/м*',
        informerDescription: '* Цена за погонный метр',
    },
    slide3: {
        subTitle: 'При заказке кухни InterIst',
        informerTitle: 'Скидка 30%',
        buttonText: 'Условия акции',
        href: paths.login,
    },
};
