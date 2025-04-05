import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import {
    Categories,
    CategoriesResponse,
    Error,
} from '@/entities/categories/api';
import { fetcher } from '@/shared/api/requests/fetcher';
import { mapCategories } from '@/entities/categories/lib';

export const getCategories = async (): Promise<Categories[]> => {
    const categories = await fetcher<CategoriesResponse[], void>({
        path: '/categories',
    });

    return mapCategories(categories);
};

export const createCategory = createMutation({
    effect: createInternalRequestFx<FormData, void, Error>((data) => ({
        url: '/categories',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })),
});

export const deleteCategory = createMutation({
    effect: createInternalRequestFx((id: string) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
    })),
});

export const updateCategory = createMutation({
    effect: createInternalRequestFx<
        { id: string; formData: FormData },
        void,
        Error
    >((data) => ({
        url: `/categories/${data.id}`,
        method: 'PUT',
        data: data.formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })),
});

export const getCategory = async (id: string): Promise<Categories> => {
    const category = await fetcher<CategoriesResponse, void>({
        path: `/categories/${id}`,
    });

    return {
        ...category,
        metaTitle: category.meta_title,
        metaDescription: category.meta_description,
    };
};
