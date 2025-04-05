import { atom } from '@/shared/factory/atom';
import { deleteCategory } from '@/entities/categories';
import { createStore } from 'effector';

export const categoryDeleteModel = atom(() => {
    const submitDelete = deleteCategory.start;

    const reset = deleteCategory.reset;

    const $pending = deleteCategory.$pending;
    const $isSuccess = deleteCategory.$finished;
    const $currentId = createStore<string>('').on(
        deleteCategory.start,
        (_, payload) => payload
    );

    return { submitDelete, $pending, $isSuccess, reset, $currentId };
});
