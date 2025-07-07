import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import {
    ChangePasswordParams,
    Error,
    ProfileResponse,
    User,
} from '@/entities/user-profile';
import { prisma } from '@/shared/prisma/prisma-client';
import { unstable_cache } from 'next/cache';

export const getUserProfile = unstable_cache(
    async (userId: string): Promise<User | null> => {
        try {
            return await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    phone: true,
                    role: true,
                },
            });
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            return null;
        }
    },
    ['user-profile'],
    { tags: ['user-profile'], revalidate: 3600 }
);

export const updateUserProfile = createMutation({
    effect: createInternalRequestFx<
        { userId: string; formData: FormData },
        ProfileResponse,
        Error
    >(({ userId, formData }) => ({
        url: `/user-profile/${userId}`,
        method: 'PUT',
        body: formData,
    })),
});

export const changePassword = createMutation({
    effect: createInternalRequestFx<ChangePasswordParams, void, Error>(
        (data) => ({
            url: `/user-profile/change-password`,
            method: 'POST',
            data,
        })
    ),
});
