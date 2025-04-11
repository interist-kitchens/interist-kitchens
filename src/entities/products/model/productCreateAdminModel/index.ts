import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';
import { createProduct } from '@/entities/products';
import { createStore, sample } from 'effector';
import { message } from 'antd';
import { getPrismaTypeError } from '@/shared/lib';

export const productCreateAdminModel = atom(() => {
    const submitCreate = createProduct.start;

    const reset = createProduct.reset;
    const $pending = createProduct.$pending;
    const $isSuccess = createStore(false)
        .on(createProduct.$succeeded, (_, payload) => payload)
        .reset(reset);

    sample({
        source: createProduct.finished.failure,
        fn: async (res) => {
            const error = res.error.response?.data?.code ?? '';

            await message.open({
                type: 'error',
                content: getPrismaTypeError(error),
            });
        },
    });

    const productCreateAdminPage = declarePage({
        pageType: 'productCreateAdminPage',
    });

    return {
        productCreateAdminPage,
        submitCreate,
        reset,
        $pending,
        $isSuccess,
    };
});
