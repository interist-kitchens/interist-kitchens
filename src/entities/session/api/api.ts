import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import {
    AuthDto,
    RegistrationDto,
    TokensDto,
} from '@/entities/session/api/types';

export const signUpQuery = createMutation({
    effect: createInternalRequestFx<RegistrationDto, TokensDto>((data) => ({
        url: '/register',
        method: 'post',
        data,
    })),
});

export const signInQuery = createMutation({
    effect: createInternalRequestFx<AuthDto, TokensDto>((data) => ({
        url: '/auth/login',
        method: 'post',
        data,
    })),
});
