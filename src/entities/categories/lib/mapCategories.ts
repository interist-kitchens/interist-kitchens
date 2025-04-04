import { Categories, CategoriesResponse } from '@/entities/categories';

export const mapCategories = (res: CategoriesResponse[]): Categories[] => {
    return res.map((category) => ({
        ...category,
        metaTitle: category.meta_title,
        metaDescription: category.meta_description,
    }));
};
