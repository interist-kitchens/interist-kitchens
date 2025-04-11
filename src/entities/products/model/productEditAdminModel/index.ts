import { atom } from '@/shared/factory/atom';
import { createEvent, createStore, sample } from 'effector';
import { updateProduct } from '@/entities/products';
import { message } from 'antd';

export const productEditAdminModel = atom(() => {
    const submitUpdate = updateProduct.start;
    const resetUpdateForm = createEvent();

    const $pending = updateProduct.$pending;
    const $isSuccess = createStore(false)
        .on(updateProduct.$succeeded, (_, payload) => payload)
        .reset(resetUpdateForm);

    sample({
        source: updateProduct.finished.failure,
        fn: async () => {
            await message.open({
                type: 'error',
                content: 'Ошибка обновления данных',
            });
        },
    });

    return { submitUpdate, $pending, $isSuccess, resetUpdateForm };
});
