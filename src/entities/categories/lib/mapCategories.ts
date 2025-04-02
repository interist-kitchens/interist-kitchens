import { Categories, CategoriesResponse } from '@/entities/categories';
import dayjs from 'dayjs';

export const mapCategories = (res: CategoriesResponse[]): Categories[] => {
    return res.map((category) => ({
        ...category,
        id: String(category.id),
        createdAt: dayjs(category.createdAt).format('DD.MM.YYYY'),
        updatedAt: dayjs(category.updatedAt).format('DD.MM.YYYY'),
        metaTitle: category.meta_title,
        metaDescription: category.meta_description,
    }));
};
