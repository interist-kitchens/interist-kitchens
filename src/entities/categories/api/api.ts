import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Categories, Error } from '@/entities/categories/api';
import { mapCategories } from '@/entities/categories/lib';
import { prisma } from '@/shared/prisma/prisma-client';
import { dateFormat } from '@/shared/lib';
import { generateBlurImg } from '@/shared/lib/generateBlurImg';

export const getCategories = async (): Promise<Categories[] | undefined> => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                products: true,
            },
        });

        return await mapCategories(categories);
    } catch (e) {
        console.error(e);
    }
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
    try {
        const category = await prisma.category.findUnique({
            where: { id: Number.parseInt(id) },
        });

        if (category) {
            return {
                ...category,
                id: String(id),
                createdAt: dateFormat(category.createdAt),
                updatedAt: dateFormat(category.updatedAt),
                metaTitle: category.metaTitle,
                metaDescription: category.metaDescription,
            };
        }
    } catch (e) {
        console.error(e);
    }

    return null;
};

export const getCategoryByAlias = async (
    alias: string
): Promise<Categories | null> => {
    try {
        const category = await prisma.category.findUnique({
            where: { alias: alias },
            include: {
                products: true,
            },
        });

        if (category) {
            return {
                ...category,
                id: String(category?.id),
                createdAt: dateFormat(category.createdAt),
                updatedAt: dateFormat(category.updatedAt),
                products: category?.products
                    ? await Promise.all(
                          category.products.map(async (product) => ({
                              ...product,
                              imageBlur: await generateBlurImg(product.image),
                          }))
                      )
                    : [],
            };
        }
    } catch (e) {
        console.error(e);
    }

    return null;
};
