import { atom } from '@/shared/factory/atom';
import { createStore } from 'effector';
import { deletePage } from '@/entities/pages';

export const pageDeleteModel = atom(() => {
    const submitDelete = deletePage.start;

    const reset = deletePage.reset;

    const $pending = deletePage.$pending;
    const $isSuccess = deletePage.$finished;
    const $currentId = createStore<number | null>(null).on(
        deletePage.start,
        (_, payload) => payload
    );

    return { submitDelete, $pending, $isSuccess, reset, $currentId };
});
