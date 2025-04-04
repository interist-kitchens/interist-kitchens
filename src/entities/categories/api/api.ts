import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Error } from '@/entities/categories/api';

export const createCategory = createMutation({
    effect: createInternalRequestFx<FormData, void, Error>((data) => ({
        url: '/categories/create',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })),
});

export const deleteCategory = createMutation({
    effect: createInternalRequestFx<{ id: string }, void, Error>((data) => ({
        url: '/categories/delete',
        method: 'DELETE',
        data,
    })),
});
