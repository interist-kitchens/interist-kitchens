import { atom } from '@/shared/factory/atom';
import { addProductRelation } from '@/entities/products';
import { createStore, sample } from 'effector';
import { getPrismaTypeError } from '@/shared/lib';
import { ArgsProps } from 'antd/es/message/interface';
import { messageModel } from '@/shared/lib/messageApi';

export const productRelationsAdminAddModel = atom(() => {
    const submitAdd = addProductRelation.start;

    const reset = addProductRelation.reset;
    const $pending = addProductRelation.$pending;
    const $isSuccess = createStore(false)
        .on(addProductRelation.$succeeded, (_, payload) => payload)
        .reset(reset);

    sample({
        source: addProductRelation.finished.failure,
        fn: (res) =>
            ({
                type: 'error',
                content: getPrismaTypeError(
                    res.error.response?.data?.code ?? ''
                ),
            }) as ArgsProps,
        target: messageModel.open,
    });

    return {
        submitAdd,
        reset,
        $pending,
        $isSuccess,
    };
});
