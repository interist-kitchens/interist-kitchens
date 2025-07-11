import { atom } from '@/shared/factory/atom';
import { createStore, sample } from 'effector';
import { getPrismaTypeError } from '@/shared/lib';
import { messageModel } from '@/shared/lib/messageApi';
import type { ArgsProps } from 'antd/es/message/interface';
import { createSlide } from '@/entities/slides';

export const slideCreateAdminModel = atom(() => {
    const submitCreate = createSlide.start;

    const reset = createSlide.reset;

    const $pending = createSlide.$pending;
    const $isSuccess = createStore(false)
        .on(createSlide.$succeeded, (_, payload) => payload)
        .reset(reset);

    sample({
        source: createSlide.finished.failure,
        fn: (res) =>
            ({
                type: 'error',
                content: getPrismaTypeError(res.error.code ?? ''),
            }) as ArgsProps,
        target: messageModel.open,
    });

    return {
        submitCreate,
        $pending,
        $isSuccess,
        reset,
    };
});
