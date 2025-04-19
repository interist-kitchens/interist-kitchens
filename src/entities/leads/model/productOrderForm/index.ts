import { atom } from '@/shared/factory/atom';
import { sample } from 'effector';
import { sendProductOrder } from '@/entities/leads/api';
import { messageModel, passMessageArgs } from '@/shared/lib/messageApi';
import { modalModel } from '@/shared/ui/ModalManager';

export const productOrderFormModel = atom(() => {
    const submitForm = sendProductOrder.start;
    const rest = sendProductOrder.reset;

    const $pending = sendProductOrder.$pending;

    sample({
        clock: sendProductOrder.$failed,
        filter: Boolean,
        fn: passMessageArgs({ type: 'error', content: 'Ошибка отправки' }),
        target: [messageModel.open, modalModel.closeModal],
    });

    sample({
        clock: sendProductOrder.$succeeded,
        filter: Boolean,
        fn: passMessageArgs({
            type: 'success',
            content: 'Заказ успешно отправлен',
        }),
        target: [messageModel.open, modalModel.closeModal],
    });

    return { submitForm, $pending, rest };
});
