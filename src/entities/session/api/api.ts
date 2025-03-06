import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { AuthDto, TokensDto } from '@/entities/session/api/types';

export const signUpQuery = createMutation({
    effect: createInternalRequestFx<AuthDto, TokensDto>((data) => ({
        url: '/register',
        method: 'post',
        data,
    })),
});
