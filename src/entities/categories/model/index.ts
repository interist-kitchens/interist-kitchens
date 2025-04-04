import { atom } from '@/shared/factory/atom';
import { createCategory, deleteCategory } from '@/entities/categories';
import { createStore, sample } from 'effector';

export const createCategoryModel = atom(() => {
    const submitCreate = createCategory.start;

    const reset = createCategory.reset;

    const $pending = createCategory.$pending;
    const $isSuccess = createStore(false).on(
        createCategory.$succeeded,
        (_, payload) => payload
    );
    const $isError = createStore(false).on(
        createCategory.$failed,
        (_, payload) => payload
    );
    const $error = createStore<string>('');

    sample({
        source: createCategory.finished.failure,
        fn: (res) => res.error.response?.data?.code ?? '',
        target: $error,
    });

    return {
        submitCreate,
        $pending,
        $isSuccess,
        $isError,
        $error,
        reset,
    };
});

export const categoryDeleteModel = atom(() => {
    const submitDelete = deleteCategory.start;

    const reset = deleteCategory.reset;

    const $pending = deleteCategory.$pending;
    const $isSuccess = deleteCategory.$finished;
    const $currentId = createStore<string>('').on(
        deleteCategory.start,
        (_, payload) => payload.id
    );

    return { submitDelete, $pending, $isSuccess, reset, $currentId };
});
