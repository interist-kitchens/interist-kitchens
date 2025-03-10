import { atom } from '@/shared/factory/atom';
import { signInQuery, signUpQuery } from '@/entities/session';
import { createEvent, createStore, sample } from 'effector';
import axios from 'axios';
import { or } from 'patronum';

export const sessionModel = atom(() => {
    const submitRegistration = signUpQuery.start;
    const submitLogin = signInQuery.start;

    const clearErrors = createEvent();

    const $pending = or(signUpQuery.$pending, signInQuery.$pending);
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

    sample({
        source: signInQuery.finished.failure,
        fn: (res) => {
            if (axios.isAxiosError(res.error)) {
                return res.error.response?.data?.message;
            }
            return 'Неизвестная ошибка';
        },
        target: $error,
    });

    return { $pending, submitRegistration, $error, clearErrors, submitLogin };
});
