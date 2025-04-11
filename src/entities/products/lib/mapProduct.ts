import { Product, ProductResponse } from '@/entities/products/api';
import { dateFormat } from '@/shared/lib';

export const mapProduct = (res: ProductResponse[]): Product[] => {
    return res.map((product) => ({
        ...product,
        id: String(product.id),
        createdAt: dateFormat(product.createdAt),
        updatedAt: dateFormat(product.updatedAt),
        categoryName: product.categories.name,
    }));
};
