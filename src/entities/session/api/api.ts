import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { AuthDto, RegistrationDto } from '@/entities/session/api/types';

export const signUpQuery = createMutation({
    effect: createInternalRequestFx<RegistrationDto, AuthDto, Error>(
        (data) => ({
            url: '/auth/register',
            method: 'post',
            data,
        })
    ),
});
