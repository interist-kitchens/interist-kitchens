import { Categories, CategoriesResponse } from '@/entities/categories';
import { dateFormat } from '@/shared/lib';

export const mapCategories = (res: CategoriesResponse[]): Categories[] => {
    return res.map((category) => ({
        ...category,
        id: String(category.id),
        createdAt: dateFormat(category.createdAt),
        updatedAt: dateFormat(category.updatedAt),
    }));
};
