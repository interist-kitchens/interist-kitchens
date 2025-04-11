import { atom } from '@/shared/factory/atom';
import { updateCategory } from '@/entities/categories';
import { createEvent, createStore, sample } from 'effector';
import { message } from 'antd';

export const categoryEditAdminModel = atom(() => {
    const submitUpdate = updateCategory.start;
    const resetUpdateForm = createEvent();

    const $pending = updateCategory.$pending;
    const $isSuccess = createStore(false)
        .on(updateCategory.$succeeded, (_, payload) => payload)
        .reset(resetUpdateForm);

    sample({
        source: updateCategory.finished.failure,
        fn: async () => {
            await message.open({
                type: 'error',
                content: 'Ошибка обновления данных',
            });
        },
    });

    return { submitUpdate, $pending, $isSuccess, resetUpdateForm };
});
