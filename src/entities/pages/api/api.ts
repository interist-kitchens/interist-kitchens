import { prisma } from '@/shared/prisma/prisma-client';
import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Error } from '@/entities/categories';
import { PageCreateRequest } from '@/entities/pages/api/types';

export const getPages = async () => {
    try {
        const pages = await prisma.page.findMany();

        return pages;
    } catch (e) {
        console.error(e);
    }
};

export const getPage = async (alias: string) => {
    try {
        const page = await prisma.page.findUnique({
            where: { alias },
        });

        return page;
    } catch (e) {
        console.error(e);
    }

    return null;
};

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
