export type ModalType =
    | 'callback'
    | 'productOrder'
    | 'orderProject'
    | 'deleteSlide';

export const MODAL_TITLES: Record<ModalType, string> = {
    callback: 'Форма обратной связи',
    productOrder: 'Заказать индивидуальный размер',
    orderProject: 'Получите бесплатный дизайн-проект',
    deleteSlide: 'Вы уверены, что хотите удалить слайд?',
};
