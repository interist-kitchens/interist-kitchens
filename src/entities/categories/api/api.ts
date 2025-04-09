import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Categories, Error } from '@/entities/categories/api';
import { mapCategories } from '@/entities/categories/lib';
import dayjs from 'dayjs';
import { prisma } from '@/shared/prisma/prisma-client';

export const getCategories = async (): Promise<Categories[]> => {
    const categories = await prisma.category.findMany();

    return mapCategories(categories);
};

export const createCategory = createMutation({
    effect: createInternalRequestFx<FormData, void, Error>((data) => ({
        url: '/categories',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })),
});

export const deleteCategory = createMutation({
    effect: createInternalRequestFx((id: string) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
    })),
});

export const updateCategory = createMutation({
    effect: createInternalRequestFx<
        { id: string; formData: FormData },
        void,
        Error
    >((data) => ({
        url: `/categories/${data.id}`,
        method: 'PUT',
        data: data.formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })),
});

export const getCategory = async (id: string): Promise<Categories | null> => {
    const category = await prisma.category.findUnique({
        where: { id: Number.parseInt(id) },
    });

    if (category) {
        return {
            ...category,
            id: String(id),
            createdAt: dayjs(category.createdAt).format('DD.MM.YYYY'),
            updatedAt: dayjs(category.updatedAt).format('DD.MM.YYYY'),
            metaTitle: category.metaTitle,
            metaDescription: category.metaDescription,
        };
    }

    return null;
};
