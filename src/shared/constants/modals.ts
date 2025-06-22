export type ModalType = 'callback' | 'productOrder' | 'orderProject';

export const MODAL_TITLES: Record<ModalType, string> = {
    callback: 'Форма обратной связи',
    productOrder: 'Заказать индивидуальный размер',
    orderProject: 'Получите бесплатный дизайн-проект кухни',
};
