import { prisma } from '@/shared/prisma/prisma-client';
import { Product, ProductResponse } from '@/entities/products/api/types';
import { mapProduct } from '@/entities/products/lib';
import { dateFormat } from '@/shared/lib';
import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Error } from '@/entities/categories';
import { generateBlurImg } from '@/shared/lib/generateBlurImg';
import { unstable_cache } from 'next/cache';

export const getProducts = unstable_cache(
    async (): Promise<Product[] | undefined> => {
        try {
            const products: ProductResponse[] = await prisma.product.findMany({
                include: {
                    categories: {
                        select: {
                            name: true,
                            alias: true,
                        },
                    },
                    relatedFrom: {
                        include: {
                            toProduct: {
                                include: {
                                    categories: {
                                        select: {
                                            name: true,
                                            alias: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    coordinates: true,
                },
            });

            return await mapProduct(products);
        } catch (e) {
            console.error(e);
        }
    },
    ['products'],
    { tags: ['products'], revalidate: 3600 }
);

export const getProduct = unstable_cache(
    async (id: string): Promise<Product | null> => {
        const product = await prisma.product.findUnique({
            where: { id: Number.parseInt(id) },
            include: {
                categories: {
                    select: {
                        name: true,
                        alias: true,
                    },
                },
                relatedFrom: {
                    include: {
                        toProduct: {
                            select: {
                                id: true,
                                name: true,
                                alias: true,
                                image: true,
                                price: true,
                                categories: {
                                    select: {
                                        name: true,
                                        alias: true,
                                    },
                                },
                            },
                        },
                    },
                },
                coordinates: true,
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
                relatedProducts: product.relatedFrom.map((relation) => ({
                    id: String(relation.id),
                    name: relation.toProduct.name,
                    alias: relation.toProduct.alias,
                    image: relation.toProduct.image,
                    price: relation.toProduct.price,
                    type: relation.type,
                    categories: {
                        name: relation.toProduct.categories?.name || '',
                        alias: relation.toProduct.categories?.alias || '',
                    },
                })),
                coordinates: product.coordinates,
            };
        }

        return null;
    },
    ['products'],
    { tags: ['products'], revalidate: 3600 }
);

export const getProductByAlias = unstable_cache(
    async (alias: string): Promise<Product | null> => {
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
                    relatedFrom: {
                        include: {
                            toProduct: {
                                select: {
                                    id: true,
                                    name: true,
                                    alias: true,
                                    image: true,
                                    price: true,
                                    categories: {
                                        select: {
                                            name: true,
                                            alias: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    coordinates: {
                        include: {
                            relatedProduct: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                    price: true,
                                },
                            },
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
                        [product.image, ...product.images].map(
                            async (image) => ({
                                image,
                                blurImage: await generateBlurImg(image),
                            })
                        )
                    ),
                    relatedProducts: product.relatedFrom.map((relation) => ({
                        id: String(relation.toProduct.id),
                        name: relation.toProduct.name,
                        alias: relation.toProduct.alias,
                        image: relation.toProduct.image,
                        price: relation.toProduct.price,
                        type: relation.type,
                        categories: {
                            name: relation.toProduct.categories?.name || '',
                            alias: relation.toProduct.categories?.alias || '',
                        },
                    })),
                    coordinates: product.coordinates,
                };
            }
        } catch (e) {
            console.error(e);
        }

        return null;
    },
    ['products'],
    { tags: ['products'], revalidate: 3600 }
);

export const createProduct = createMutation({
    effect: createInternalRequestFx<FormData, void, Error>((data) => ({
        url: '/products',
        method: 'POST',
        body: data,
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
        body: data.formData,
    })),
});

export const addCoordinate = createMutation({
    effect: createInternalRequestFx<
        {
            productId: string;
            x: number;
            y: number;
            relatedProductId: string | null;
        },
        void,
        Error
    >((data) => ({
        url: `/products/${data.productId}/coordinates`,
        method: 'POST',
        body: JSON.stringify({
            x: data.x,
            y: data.y,
            relatedProductId: data.relatedProductId,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })),
});

export const deleteCoordinate = createMutation({
    effect: createInternalRequestFx<
        { coordinateId: number; productId: string },
        void,
        Error
    >((data) => ({
        url: `/products/${data.productId}/coordinates`,
        method: 'DELETE',
        body: JSON.stringify({ coordinateId: data.coordinateId }),
        headers: {
            'Content-Type': 'application/json',
        },
    })),
});

export const updateCoordinate = createMutation({
    effect: createInternalRequestFx<
        { coordinateId: number; relatedProductId: string | null },
        void,
        Error
    >((data) => ({
        url: `/products/coordinates/${data.coordinateId}`,
        method: 'PUT',
        body: JSON.stringify({ coordinateId: data.coordinateId }),
        headers: {
            'Content-Type': 'application/json',
        },
    })),
});
