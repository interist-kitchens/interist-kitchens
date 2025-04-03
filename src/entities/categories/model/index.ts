import { atom } from '@/shared/factory/atom';
import { createCategory } from '@/entities/categories';
import { createStore, sample } from 'effector';

export const createCategoryModel = atom(() => {
    const submitRegistration = createCategory.start;

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
        submitRegistration,
        $pending,
        $isSuccess,
        $isError,
        $error,
        reset,
    };
});
