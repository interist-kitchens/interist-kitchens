import { atom } from '@/shared/factory/atom';
import { AuthDto, signUpQuery } from '@/entities/session';
import { createEffect, createEvent, createStore, sample } from 'effector';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { or } from 'patronum';

export const sessionModel = atom(() => {
    const submitLogin = createEvent<AuthDto>();
    const submitRegistration = signUpQuery.start;
    const clearErrors = createEvent();

    const submitLoginFx = createEffect(async (data: AuthDto) => {
        const res = await signIn('credentials', {
            email: data?.email,
            password: data?.password,
            callbackUrl: '/',
        });

        if (res?.status !== 200) {
            return Promise.reject(res?.error);
        }

        return res;
    });

    const $pending = or(signUpQuery.$pending, submitLoginFx.pending);
    const $error = createStore('').reset(clearErrors);

    sample({
        source: signUpQuery.finished.failure,
        fn: (res) => {
            if (axios.isAxiosError(res.error)) {
                return res.error.response?.data;
            }
            return 'Неизвестная ошибка';
        },
        target: $error,
    });

    sample({
        source: submitLoginFx.fail,
        fn: (res) => {
            if (axios.isAxiosError(res.error)) {
                return res.error.response?.data;
            }
            return res.error ?? 'Неизвестная ошибка';
        },
        target: $error,
    });

    sample({
        clock: submitLogin,
        target: submitLoginFx,
    });

    sample({
        source: signUpQuery.finished.success,
        fn: (res) => res.result.data,
        target: submitLoginFx,
    });

    return {
        $pending,
        submitRegistration,
        $error,
        clearErrors,
        submitLoginFx,
        submitLogin,
    };
});
