import { prisma } from '@/shared/prisma/prisma-client';
import { unstable_cache } from 'next/cache';
import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Error } from './types';

export const getAttributes = unstable_cache(
    async () => {
        try {
            const attributes = await prisma.productAttribute.findMany();

            return attributes;
        } catch (error) {
            console.error(error);
        }

        return [];
    },
    ['attributes'],
    { tags: ['attributes'], revalidate: 3600 }
);

export const createAttributes = createMutation({
    effect: createInternalRequestFx<FormData, void, Error>((data) => ({
        url: '/attributes',
        method: 'POST',
        body: data,
    })),
});

export const deleteAttributes = createMutation({
    effect: createInternalRequestFx((id: string) => ({
        url: `/attributes`,
        data: { id },
        method: 'DELETE',
    })),
});
