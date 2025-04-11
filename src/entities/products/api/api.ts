import { prisma } from '@/shared/prisma/prisma-client';
import { Product, ProductResponse } from '@/entities/products/api/types';
import { mapProduct } from '@/entities/products/lib';
import { dateFormat } from '@/shared/lib';

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
            createdAt: dateFormat(product.createdAt),
            updatedAt: dateFormat(product.updatedAt),
            metaTitle: product.metaTitle,
            metaDescription: product.metaDescription,
            categoryName: product.categories.name,
        };
    }

    return null;
};
