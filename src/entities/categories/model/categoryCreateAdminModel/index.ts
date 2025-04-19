import { atom } from '@/shared/factory/atom';
import { createCategory } from '@/entities/categories';
import { createStore, sample } from 'effector';
import { declarePage } from '@/shared/app';
import { getPrismaTypeError } from '@/shared/lib';
import { messageModel } from "@/shared/lib/messageApi";
import type { ArgsProps } from "antd/es/message/interface";

export const categoryCreateAdminModel = atom(() => {
    const submitCreate = createCategory.start;

    const reset = createCategory.reset;

    const $pending = createCategory.$pending;
    const $isSuccess = createStore(false)
        .on(createCategory.$succeeded, (_, payload) => payload)
        .reset(reset);

    sample({
        source: createCategory.finished.failure,
        fn: (res) =>  ({ type: 'error', content: getPrismaTypeError(res.error.response?.data?.code ?? '') } as ArgsProps),
        target: messageModel.open
    });

    const categoryCreateAdminPage = declarePage({
        pageType: 'categoryCreateAdminPage',
    });

    return {
        submitCreate,
        $pending,
        $isSuccess,
        reset,
        categoryCreateAdminPage,
    };
});
