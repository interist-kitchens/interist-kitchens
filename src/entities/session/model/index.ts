import { atom } from '@/shared/factory/atom';
import { AuthDto, signUpQuery } from '@/entities/session';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { signIn, SignInResponse } from 'next-auth/react';
import { or } from 'patronum';

export const sessionModel = atom(() => {
    const submitLogin = createEvent<AuthDto>();
    const submitRegistration = signUpQuery.start;
    const clearErrors = createEvent();

    const submitLoginFx = createEffect<AuthDto, SignInResponse, Error>(
        async (data: AuthDto) => {
            const res = await signIn('credentials', {
                email: data?.email,
                password: data?.password,
                callbackUrl: '/',
                redirect: false,
            });

            if (res?.status !== 200) {
                return Promise.reject(res?.error);
            }

            return res;
        }
    );

    const $pending = or(signUpQuery.$pending, submitLoginFx.pending);
    const $error = createStore('').reset(clearErrors);

    sample({
        source: signUpQuery.finished.failure,
        fn: (res) => {
            if (res.error instanceof Error) {
                try {
                    if ('response' in res.error) {
                        const errorResponse = res.error.response as Response;
                        return errorResponse.statusText || 'Неизвестная ошибка';
                    }
                    return res.error.message || 'Неизвестная ошибка';
                } catch {
                    return 'Неизвестная ошибка';
                }
            }
            return 'Неизвестная ошибка';
        },
        target: $error,
    });

    sample({
        source: submitLoginFx.fail,
        fn: (res) => {
            if (res.error instanceof Error) {
                try {
                    if ('response' in res.error) {
                        const errorResponse = res.error.response as Response;
                        return errorResponse.statusText || res.error.message;
                    }
                    return res.error.message || 'Неизвестная ошибка';
                } catch {
                    return 'Неизвестная ошибка';
                }
            }
            return 'Неизвестная ошибка';
        },
        target: $error,
    });

    sample({
        clock: submitLogin,
        target: submitLoginFx,
    });

    sample({
        source: signUpQuery.finished.success,
        fn: (res) => {
            return res.result;
        },
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
