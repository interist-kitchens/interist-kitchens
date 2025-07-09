import { atom } from '@/shared/factory/atom';
import { createStore } from 'effector';
import { deleteSlide } from '@/entities/slides';

export const slideDeleteModel = atom(() => {
    const submitDelete = deleteSlide.start;
    const reset = deleteSlide.reset;

    const $pending = deleteSlide.$pending;
    const $isSuccess = deleteSlide.$finished;
    const $currentId = createStore<string>('').on(
        deleteSlide.start,
        (_, payload) => payload
    );

    return { submitDelete, $pending, $isSuccess, reset, $currentId };
});
