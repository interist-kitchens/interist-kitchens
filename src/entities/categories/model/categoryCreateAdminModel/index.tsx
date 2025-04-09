import { atom } from '@/shared/factory/atom';
import { createCategory } from '@/entities/categories';
import { createStore, sample } from 'effector';
import { declarePage } from '@/shared/app';
import { message } from 'antd';

const gerErrorType = (errorCode: string) => {
    switch (errorCode) {
        case 'P2002':
            return 'Алиас уже занят. Введите другой';
        default:
            return 'Ошибка запроса на добавление категории. Попробуйте позже.';
    }
};

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
                content: gerErrorType(error),
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
