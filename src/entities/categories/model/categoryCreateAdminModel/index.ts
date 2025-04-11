import { atom } from '@/shared/factory/atom';
import { createCategory } from '@/entities/categories';
import { createStore, sample } from 'effector';
import { declarePage } from '@/shared/app';
import { message } from 'antd';
import { getPrismaTypeError } from '@/shared/lib';

export const categoryCreateAdminModel = atom(() => {
    const submitCreate = createCategory.start;

    const reset = createCategory.reset;

    const $pending = createCategory.$pending;
    const $isSuccess = createStore(false)
        .on(createCategory.$succeeded, (_, payload) => payload)
        .reset(reset);

    sample({
        source: createCategory.finished.failure,
        fn: async (res) => {
            const error = res.error.response?.data?.code ?? '';

            await message.open({
                type: 'error',
                content: getPrismaTypeError(error),
            });
        },
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
