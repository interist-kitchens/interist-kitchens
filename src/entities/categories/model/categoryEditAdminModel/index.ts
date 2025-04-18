import { atom } from '@/shared/factory/atom';
import { updateCategory } from '@/entities/categories';
import { createEvent, createStore, sample } from 'effector';
import { messageModel, passMessageArgs } from "@/shared/lib/messageApi";

export const categoryEditAdminModel = atom(() => {
    const submitUpdate = updateCategory.start;
    const resetUpdateForm = createEvent();

    const $pending = updateCategory.$pending;
    const $isSuccess = createStore(false)
        .on(updateCategory.$succeeded, (_, payload) => payload)
        .reset(resetUpdateForm);

    sample({
        source: updateCategory.finished.failure,
        fn: passMessageArgs({type: 'error', content: 'Ошибка обновления данных'}),
        target: messageModel.open
    });

    return { submitUpdate, $pending, $isSuccess, resetUpdateForm };
});
