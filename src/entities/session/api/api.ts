import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { RegistrationDto, TokensDto } from '@/entities/session/api/types';

export const signUpQuery = createMutation({
    effect: createInternalRequestFx<RegistrationDto, TokensDto>((data) => ({
        url: '/auth/register',
        method: 'post',
        data,
    })),
});
