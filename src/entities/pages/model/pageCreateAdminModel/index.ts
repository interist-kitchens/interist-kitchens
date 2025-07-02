import { atom } from '@/shared/factory/atom';
import { createStore, sample } from 'effector';
import { declarePage } from '@/shared/app';
import { getPrismaTypeError } from '@/shared/lib';
import { messageModel } from '@/shared/lib/messageApi';
import type { ArgsProps } from 'antd/es/message/interface';
import { createPage } from '@/entities/pages';

export const pageCreateAdminModel = atom(() => {
    const submitCreate = createPage.start;

    const reset = createPage.reset;

    const $pending = createPage.$pending;
    const $isSuccess = createStore(false)
        .on(createPage.$succeeded, (_, payload) => payload)
        .reset(reset);

    sample({
        source: createPage.finished.failure,
        fn: (res) =>
            ({
                type: 'error',
                content: getPrismaTypeError(res.error.code ?? ''),
            }) as ArgsProps,
        target: messageModel.open,
    });

    const pageCreateAdminPage = declarePage({
        pageType: 'pageCreateAdminPage',
    });

    return {
        submitCreate,
        $pending,
        $isSuccess,
        reset,
        pageCreateAdminPage,
    };
});
