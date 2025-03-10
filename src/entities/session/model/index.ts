import { atom } from '@/shared/factory/atom';
import { signUpQuery } from '@/entities/session';
import { createEvent, createStore, sample } from 'effector';
import axios from 'axios';

export const sessionModel = atom(() => {
    const submitRegistration = signUpQuery.start;
    const clearErrors = createEvent();

    const $pending = signUpQuery.$pending;
    const $error = createStore('').reset(clearErrors);

    sample({
        source: signUpQuery.finished.failure,
        fn: (res) => {
            if (axios.isAxiosError(res.error)) {
                return res.error.response?.data?.message;
            }
            return 'Неизвестная ошибка';
        },
        target: $error,
    });

    return { $pending, submitRegistration, $error, clearErrors };
});
