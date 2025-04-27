import { prisma } from '@/shared/prisma/prisma-client';
import { Product, ProductResponse } from '@/entities/products/api/types';
import { mapProduct } from '@/entities/products/lib';
import { dateFormat } from '@/shared/lib';
import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Error } from '@/entities/categories';
import { generateBlurImg } from '@/shared/lib/generateBlurImg';

export const getProducts = async (): Promise<Product[] | undefined> => {
    try {
        const products: ProductResponse[] = await prisma.product.findMany({
            include: {
                categories: {
                    select: {
                        name: true,
                        alias: true,
                    },
                },
            },
        });

        return await mapProduct(products);
    } catch (e) {
        console.error(e);
    }
};

export const getProduct = async (id: string): Promise<Product | null> => {
    const product = await prisma.product.findUnique({
        where: { id: Number.parseInt(id) },
        include: {
            categories: {
                select: {
                    name: true,
                    alias: true,
                },
            },
        },
    });

    if (product) {
        return {
            ...product,
            id: String(product.id),
            createdAt: dateFormat(product.createdAt),
            updatedAt: dateFormat(product.updatedAt),
            metaTitle: product.metaTitle,
            metaDescription: product.metaDescription,
            categoryName: product.categories.name,
            text: product.text ?? '',
            images: await Promise.all(
                [product.image, ...product.images].map(async (image) => ({
                    image,
                    blurImage: await generateBlurImg(image),
                }))
            ),
        };
    }

    return null;
};

export const getProductByAlias = async (
    alias: string
): Promise<Product | null> => {
    try {
        const product = await prisma.product.findUnique({
            where: { alias: alias },
            include: {
                categories: {
                    select: {
                        name: true,
                        alias: true,
                    },
                },
            },
        });

        if (product) {
            return {
                ...product,
                id: String(product.id),
                createdAt: dateFormat(product.createdAt),
                updatedAt: dateFormat(product.updatedAt),
                metaTitle: product.metaTitle,
                metaDescription: product.metaDescription,
                categoryName: product.categories.name,
                text: product.text ?? '',
                images: await Promise.all(
                    [product.image, ...product.images].map(async (image) => ({
                        image,
                        blurImage: await generateBlurImg(image),
                    }))
                ),
            };
        }
    } catch (e) {
        console.error(e);
    }

    return null;
};

export const createProduct = createMutation({
    effect: createInternalRequestFx<FormData, void, Error>((data) => ({
        url: '/products',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })),
});

export const deleteProduct = createMutation({
    effect: createInternalRequestFx((id: string) => ({
        url: `/products/${id}`,
        method: 'DELETE',
    })),
});

export const updateProduct = createMutation({
    effect: createInternalRequestFx<
        { id: string; formData: FormData },
        void,
        Error
    >((data) => ({
        url: `/products/${data.id}`,
        method: 'PUT',
        data: data.formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })),
});
