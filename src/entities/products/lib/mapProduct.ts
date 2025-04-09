import dayjs from 'dayjs';
import { Product, ProductResponse } from '@/entities/products/api';

export const mapProduct = (res: ProductResponse[]): Product[] => {
    return res.map((product) => ({
        ...product,
        id: String(product.id),
        createdAt: dayjs(product.createdAt).format('DD.MM.YYYY'),
        updatedAt: dayjs(product.updatedAt).format('DD.MM.YYYY'),
        categoryName: product.categories.name,
    }));
};
