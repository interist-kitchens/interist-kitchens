import { atom } from '@/shared/factory/atom';
import { updateCategory } from '@/entities/categories';
import { createStore } from 'effector';

export const categoryEditAdminModel = atom(() => {
    const submitUpdate = updateCategory.start;

    const $pending = updateCategory.$pending;
    const $isSuccess = createStore(false).on(
        updateCategory.$succeeded,
        (_, payload) => payload
    );
    const $isError = createStore(false).on(
        updateCategory.$failed,
        (_, payload) => payload
    );

    return { submitUpdate, $pending, $isSuccess, $isError };
});
