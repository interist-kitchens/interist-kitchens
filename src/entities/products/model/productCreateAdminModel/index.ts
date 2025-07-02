import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';
import { createProduct } from '@/entities/products';
import { createStore, sample } from 'effector';
import { getPrismaTypeError } from '@/shared/lib';
import { messageModel } from '@/shared/lib/messageApi';
import { ArgsProps } from 'antd/es/message/interface';

export const productCreateAdminModel = atom(() => {
    const submitCreate = createProduct.start;

    const reset = createProduct.reset;
    const $pending = createProduct.$pending;
    const $isSuccess = createStore(false)
        .on(createProduct.$succeeded, (_, payload) => payload)
        .reset(reset);

    sample({
        source: createProduct.finished.failure,
        fn: (res) =>
            ({
                type: 'error',
                content: getPrismaTypeError(res.error.code ?? ''),
            }) as ArgsProps,
        target: messageModel.open,
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
