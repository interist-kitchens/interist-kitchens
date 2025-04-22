import { atom } from '@/shared/factory/atom';
import { sendOrderProject } from '@/entities/leads/api';
import { sample } from 'effector';
import { messageModel, passMessageArgs } from '@/shared/lib/messageApi';
import { modalModel } from '@/shared/ui/ModalManager';

export const orderProjectFormModel = atom(() => {
    const submitForm = sendOrderProject.start;
    const rest = sendOrderProject.reset;

    const $pending = sendOrderProject.$pending;

    sample({
        clock: sendOrderProject.$failed,
        filter: Boolean,
        fn: passMessageArgs({ type: 'error', content: 'Ошибка отправки' }),
        target: [messageModel.open, modalModel.closeModal],
    });

    sample({
        clock: sendOrderProject.$succeeded,
        filter: Boolean,
        fn: passMessageArgs({
            type: 'success',
            content: 'Заказ успешно отправлен',
        }),
        target: [messageModel.open, modalModel.closeModal],
    });

    return { submitForm, $pending, rest };
});
