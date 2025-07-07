import { createAttributes, deleteAttributes } from '@/entities/attributes';
import { atom } from '@/shared/factory/atom';
import { combine, sample } from 'effector';
import { ArgsProps } from 'antd/es/message/interface';
import { messageModel } from '@/shared/lib/messageApi';

export const attributesModel = atom(() => {
    const createAttribute = createAttributes.start;
    const deleteAttribute = deleteAttributes.start;

    sample({
        clock: createAttributes.$succeeded,
        fn: () =>
            ({
                type: 'success',
                content: 'Атрибут успешно создан',
            }) as ArgsProps,
        target: [messageModel.open],
    });

    sample({
        clock: deleteAttributes.$succeeded,
        fn: () =>
            ({
                type: 'success',
                content: 'Атрибут успешно удалён',
            }) as ArgsProps,
        target: [messageModel.open], // Обновляем страницу и показываем уведомление
    });

    sample({
        clock: createAttributes.finished.failure,
        fn: ({ error }) =>
            ({
                type: 'error',
                content: error.error || 'Ошибка при создании атрибута',
            }) as ArgsProps,
        target: messageModel.open,
    });

    sample({
        clock: deleteAttributes.finished.failure,
        fn: () =>
            ({
                type: 'error',
                content: 'Ошибка при удалении атрибута',
            }) as ArgsProps,
        target: messageModel.open,
    });

    // Состояния загрузки
    const $pending = combine(
        createAttributes.$pending,
        deleteAttributes.$pending,
        (createPending, deletePending) => createPending || deletePending
    );

    // Состояния успешного выполнения
    const $isSuccess = combine(
        createAttributes.$succeeded,
        deleteAttributes.$succeeded,
        (createSuccess, deleteSuccess) => createSuccess || deleteSuccess
    );

    return {
        createAttribute, // Событие для создания
        deleteAttribute, // Событие для удаления
        $pending, // Состояние загрузки
        $isSuccess, // Состояние успеха
    };
});
