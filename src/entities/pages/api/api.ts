import { prisma } from '@/shared/prisma/prisma-client';
import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Error } from '@/entities/categories';
import { PageCreateRequest } from '@/entities/pages/api/types';
import { unstable_cache } from 'next/cache';

export const getPages = unstable_cache(
    async () => {
        try {
            const pages = await prisma.page.findMany();

            return pages;
        } catch (e) {
            console.error(e);
        }
    },
    ['pages'],
    { tags: ['pages'], revalidate: 3600 }
);

export const getPage = unstable_cache(
    async (alias: string) => {
        try {
            const page = await prisma.page.findUnique({
                where: { alias },
            });

            return page;
        } catch (e) {
            console.error(e);
        }

        return null;
    },
    ['pages'],
    { tags: ['pages'], revalidate: 3600 }
);

export const createPage = createMutation({
    effect: createInternalRequestFx<PageCreateRequest, void, Error>((data) => ({
        url: '/pages',
        method: 'POST',
        data,
    })),
});

export const deletePage = createMutation({
    effect: createInternalRequestFx((id: number) => ({
        url: `/pages/${id}`,
        method: 'DELETE',
    })),
});

export const updatePage = createMutation({
    effect: createInternalRequestFx<
        { id: number; data: PageCreateRequest },
        void,
        Error
    >((data) => ({
        url: `/pages/${data.id}`,
        method: 'PUT',
        data: data.data,
    })),
});
