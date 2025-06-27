import { atom } from '@/shared/factory/atom';
import { combine, createEvent, sample } from 'effector';
import {
    addCoordinate,
    deleteCoordinate,
    updateCoordinate,
} from '@/entities/products/api';
import { messageModel } from '@/shared/lib/messageApi';
import { ArgsProps } from 'antd/es/message/interface';

export const productCoordinatesModel = atom(() => {
    const coordinateAdded = createEvent<{
        productId: string;
        x: number;
        y: number;
        relatedProductId: string | null;
    }>();
    const coordinateDeleted = createEvent<{
        coordinateId: number;
        productId: string;
    }>();
    const coordinateUpdated = createEvent<{
        coordinateId: number;
        relatedProductId: string | null;
    }>();

    sample({
        clock: coordinateAdded,
        target: addCoordinate.start,
    });

    sample({
        clock: coordinateDeleted,
        target: deleteCoordinate.start,
    });

    sample({
        clock: coordinateUpdated,
        target: updateCoordinate.start,
    });

    sample({
        clock: addCoordinate.$succeeded,
        fn: () =>
            ({ type: 'success', content: 'Координата добавлена' }) as ArgsProps,
        target: messageModel.open,
    });

    sample({
        clock: deleteCoordinate.$succeeded,
        fn: () =>
            ({ type: 'success', content: 'Координата удалена' }) as ArgsProps,
        target: messageModel.open,
    });
    sample({
        clock: updateCoordinate.$succeeded,
        fn: () =>
            ({ type: 'success', content: 'Точка обновлена' }) as ArgsProps,
        target: messageModel.open,
    });

    sample({
        clock: addCoordinate.finished.failure,
        fn: () =>
            ({
                type: 'error',
                content: 'Ошибка добавления координаты',
            }) as ArgsProps,
        target: messageModel.open,
    });

    sample({
        clock: deleteCoordinate.finished.failure,
        fn: () =>
            ({
                type: 'error',
                content: 'Ошибка удаления координаты',
            }) as ArgsProps,
        target: messageModel.open,
    });

    sample({
        clock: updateCoordinate.finished.failure,
        fn: () =>
            ({
                type: 'error',
                content: 'Ошибка обновления точки',
            }) as ArgsProps,
        target: messageModel.open,
    });

    return {
        coordinateAdded,
        coordinateDeleted,
        coordinateUpdated,
        $pending: combine(
            addCoordinate.$pending,
            deleteCoordinate.$pending,
            updateCoordinate.$pending,
            (adding, deleting, updating) => adding || deleting || updating
        ),
        $isSuccess: combine(
            addCoordinate.$succeeded,
            updateCoordinate.$succeeded,
            deleteCoordinate.$succeeded,
            (adding, deleting, updating) => adding || deleting || updating
        ),
    };
});
