import { atom } from '@/shared/factory/atom';
import { createEvent, createStore, sample } from 'effector';
import { messageModel, passMessageArgs } from '@/shared/lib/messageApi';
import { updatePage } from '@/entities/pages';

export const pageEditAdminModel = atom(() => {
    const submitUpdate = updatePage.start;
    const resetUpdateForm = createEvent();

    const $pending = updatePage.$pending;
    const $isSuccess = createStore(false)
        .on(updatePage.$succeeded, (_, payload) => payload)
        .reset(resetUpdateForm);

    sample({
        source: updatePage.finished.failure,
        fn: passMessageArgs({
            type: 'error',
            content: 'Ошибка обновления данных',
        }),
        target: messageModel.open,
    });

    return { submitUpdate, $pending, $isSuccess, resetUpdateForm };
});
