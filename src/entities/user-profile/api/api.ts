import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';
import { Error } from '@/entities/categories';
import { ProfileResponse, User } from '@/entities/user-profile';
import { prisma } from '@/shared/prisma/prisma-client';

export const getUserProfile = async (userId: string): Promise<User | null> => {
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
};

export const updateUserProfile = createMutation({
    effect: createInternalRequestFx<
        { userId: string; formData: FormData },
        ProfileResponse,
        Error
    >(({ userId, formData }) => ({
        url: `/user-profile/${userId}`,
        method: 'PUT',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })),
});
