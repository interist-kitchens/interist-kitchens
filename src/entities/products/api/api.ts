import { prisma } from '@/shared/prisma/prisma-client';
import { Product, ProductResponse } from '@/entities/products/api/types';
import { mapProduct } from '@/entities/products/lib';

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
