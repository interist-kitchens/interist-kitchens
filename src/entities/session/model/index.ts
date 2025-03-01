import { atom } from '@/shared/factory/atom';
import { signUpQuery } from '@/entities/session';
import { createEvent, createStore, sample } from 'effector';

export const sessionModel = atom(() => {
    const submitRegistration = signUpQuery.start;
    const clearErrors = createEvent();

    const $pending = signUpQuery.$pending;
    const $error = createStore('').reset(clearErrors);

    sample({
        source: signUpQuery.finished.failure,
        fn: (res) => {
            if (
                res.error &&
                typeof res.error === 'object' &&
                'data' in res.error &&
                res.error.data &&
                typeof res.error.data === 'object' &&
                'message' in res.error.data
            ) {
                return res.error.data.message as string;
            }
            return 'Неизвестная ошибка';
        },
        target: $error,
    });

    return { $pending, submitRegistration, $error, clearErrors };
});
