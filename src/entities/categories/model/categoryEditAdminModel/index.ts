import { atom } from '@/shared/factory/atom';
import { updateCategory } from '@/entities/categories';
import { createEvent, createStore } from 'effector';

export const categoryEditAdminModel = atom(() => {
    const submitUpdate = updateCategory.start;
    const resetUpdateForm = createEvent();

    const $pending = updateCategory.$pending;
    const $isSuccess = createStore(false)
        .on(updateCategory.$succeeded, (_, payload) => payload)
        .reset(resetUpdateForm);
    const $isError = createStore(false)
        .on(updateCategory.$failed, (_, payload) => payload)
        .reset(resetUpdateForm);

    return { submitUpdate, $pending, $isSuccess, $isError, resetUpdateForm };
});
