import { atom } from '@/shared/factory/atom';
import { combine, createEvent, sample } from 'effector';
import { addCoordinate, deleteCoordinate } from '@/entities/products/api';
import { messageModel } from '@/shared/lib/messageApi';
import { ArgsProps } from 'antd/es/message/interface';

export const productCoordinatesModel = atom(() => {
    const coordinateAdded = createEvent<{
        productId: string;
        x: number;
        y: number;
        link: string;
    }>();
    const coordinateDeleted = createEvent<{
        coordinateId: number;
        productId: string;
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

    return {
        coordinateAdded,
        coordinateDeleted,
        $pending: combine(
            addCoordinate.$pending,
            deleteCoordinate.$pending,
            (adding, deleting) => adding || deleting
        ),
    };
});
