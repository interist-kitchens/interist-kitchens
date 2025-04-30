import { prisma } from '@/shared/prisma/prisma-client';

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
