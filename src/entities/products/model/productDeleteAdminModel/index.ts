import { atom } from '@/shared/factory/atom';
import { createStore } from 'effector';
import { deleteProduct } from '@/entities/products';

export const productDeleteAdminModel = atom(() => {
    const submitDelete = deleteProduct.start;

    const reset = deleteProduct.reset;

    const $pending = deleteProduct.$pending;
    const $isSuccess = deleteProduct.$finished;
    const $currentId = createStore<string>('').on(
        deleteProduct.start,
        (_, payload) => payload
    );

    return { submitDelete, $pending, $isSuccess, reset, $currentId };
});
