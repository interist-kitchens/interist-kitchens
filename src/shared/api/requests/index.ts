import { createRequestFx } from '@/shared/api/requests/createRequestFx';

export const createInternalRequestFx = createRequestFx({
    baseURL: process.env.NEXT_PUBLIC_INTERNAL_API_URL,
    withTokenInHeaders: true,
});

export const createCommonRequestFx = createRequestFx({
    baseURL: process.env.API_URL,
    headers: {
        'X-API-KEY': process.env.API_TOKEN ?? '',
    },
});
