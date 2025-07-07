import { atom } from '@/shared/factory/atom';
import { changePassword, updateUserProfile } from '@/entities/user-profile';
import { createEvent, createStore, restore, sample } from 'effector';
import { messageModel, passMessageArgs } from '@/shared/lib/messageApi';
import { ArgsProps } from 'antd/es/message/interface';

export const userProfileUpdateModel = atom(() => {
    const updateProfile = updateUserProfile.start;
    const resetUpdateForm = createEvent();
    const changePasswordEvent = changePassword.start;

    const $profile = restore(updateUserProfile.finished.success, null).reset(
        resetUpdateForm
    );
    const $pending = updateUserProfile.$pending;
    const $isSuccess = createStore(false)
        .on(updateUserProfile.$succeeded, (_, payload) => payload)
        .reset(resetUpdateForm);
    const $pendingPasswordChanged = changePassword.$pending;
    const $isSuccessChangedPassword = changePassword.$succeeded;

    sample({
        clock: updateUserProfile.finished.success,
        fn: passMessageArgs({
            type: 'success',
            content: 'Профиль успешно обновлен',
        }),
        target: messageModel.open,
    });

    sample({
        source: updateUserProfile.finished.failure,
        fn: passMessageArgs({
            type: 'error',
            content: 'Ошибка обновления данных',
        }),
        target: messageModel.open,
    });

    sample({
        clock: changePassword.finished.failure,
        fn: (res) =>
            ({
                type: 'error',
                content: res?.error?.error || 'Ошибка при смене пароля',
            }) as ArgsProps,
        target: messageModel.open,
    });

    return {
        updateProfile,
        resetUpdateForm,
        $pending,
        $isSuccess,
        $profile,
        changePasswordEvent,
        $pendingPasswordChanged,
        $isSuccessChangedPassword,
    };
});
