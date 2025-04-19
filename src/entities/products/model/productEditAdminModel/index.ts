import { atom } from '@/shared/factory/atom';
import { createEvent, createStore, sample } from 'effector';
import { updateProduct } from '@/entities/products';
import { messageModel, passMessageArgs } from "@/shared/lib/messageApi";

export const productEditAdminModel = atom(() => {
    const submitUpdate = updateProduct.start;
    const resetUpdateForm = createEvent();

    const $pending = updateProduct.$pending;
    const $isSuccess = createStore(false)
        .on(updateProduct.$succeeded, (_, payload) => payload)
        .reset(resetUpdateForm);

    sample({
        source: updateProduct.finished.failure,
        fn: passMessageArgs({type: 'error', content: 'Ошибка обновления данных'}),
        target: messageModel.open
    });

    return { submitUpdate, $pending, $isSuccess, resetUpdateForm };
});
