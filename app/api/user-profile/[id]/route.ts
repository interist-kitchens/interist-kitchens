import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { prisma } from '@/shared/prisma/prisma-client';
import { put } from '@vercel/blob';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { $Enums } from '@prisma/client';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    // Проверка авторизации
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Проверка прав доступа
    if (session.user.id !== params.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const formData = await request.formData();

        const updateData: {
            name?: string;
            phone?: string;
            image?: string;
            role?: $Enums.UserRole;
            updatedAt?: Date;
        } = {
            updatedAt: new Date(),
        };

        // Обработка текстовых полей
        const name = formData.get('name');
        if (name && typeof name === 'string') updateData.name = name;

        const phone = formData.get('phone');
        if (phone && typeof phone === 'string') updateData.phone = phone;

        // Обработка роли (только для админов)
        if (session.user.role === 'ADMIN') {
            const role = formData.get('role');
            if (role && (role === 'USER' || role === 'ADMIN')) {
                updateData.role = role;
            }
        }

        // Обработка аватара
        const avatarFile = formData.get('avatar');
        if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
            const imageName = avatarFile.name || `avatar_${getUUID()}`;
            const blob = await put(`avatars/${imageName}`, avatarFile, {
                token: process.env.NEXT_PUBLIC_READ_WRITE_TOKEN,
                access: 'public',
            });
            updateData.image = blob.url;
        } else if (typeof avatarFile === 'string') {
            updateData.image = avatarFile;
        }

        // Обновление пользователя
        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                role: true,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
