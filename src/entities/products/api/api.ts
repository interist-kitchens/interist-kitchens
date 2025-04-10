import { prisma } from '@/shared/prisma/prisma-client';
import { Product, ProductResponse } from '@/entities/products/api/types';
import { mapProduct } from '@/entities/products/lib';
import dayjs from 'dayjs';

export const getProducts = async (): Promise<Product[]> => {
    const products: ProductResponse[] = await prisma.product.findMany({
        include: {
            categories: {
                select: {
                    name: true,
                },
            },
        },
    });

    return mapProduct(products);
};

export const getProduct = async (id: string): Promise<Product | null> => {
    const product = await prisma.product.findUnique({
        where: { id: Number.parseInt(id) },
        include: {
            categories: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (product) {
        return {
            ...product,
            id: String(id),
            createdAt: dayjs(product.createdAt).format('DD.MM.YYYY'),
            updatedAt: dayjs(product.updatedAt).format('DD.MM.YYYY'),
            metaTitle: product.metaTitle,
            metaDescription: product.metaDescription,
            categoryName: product.categories.name,
        };
    }

    return null;
};
