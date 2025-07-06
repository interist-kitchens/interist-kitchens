import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { prisma } from '@/shared/prisma/prisma-client';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { $Enums } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { deleteFromS3, uploadToS3 } from '@/shared/lib/s3';

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
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
            image?: string | null;
            imageKey?: string | null;
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

        const currentUser = await prisma.user.findUnique({
            where: { id: params.id },
            select: {
                image: true,
                imageKey: true,
            },
        });

        // Обработка аватара
        const avatarFile = formData.get('avatar');

        if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
            try {
                // Удаляем старое изображение, если оно существует
                if (currentUser?.imageKey) {
                    await deleteFromS3(
                        process.env.NEXT_PUBLIC_S3_BUCKET ||
                            'b914fd021b76-interest-file',
                        currentUser.imageKey
                    );
                }

                // Загружаем новое изображение
                const imageName =
                    avatarFile.name ||
                    `avatar_${getUUID()}.${avatarFile.type.split('/')[1] || 'jpg'}`;
                const uploadResult = await uploadToS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    avatarFile,
                    `avatars/${imageName}`
                );

                updateData.image = uploadResult.url;
                updateData.imageKey = uploadResult.key;
            } catch (uploadError) {
                console.error('Avatar upload failed:', uploadError);
                return NextResponse.json(
                    { error: 'Failed to upload avatar' },
                    { status: 400 }
                );
            }
        } else if (typeof avatarFile === 'string') {
            // Используем существующий аватар
            updateData.image = avatarFile;
            updateData.imageKey = currentUser?.imageKey || '';
        } else if (avatarFile === null) {
            // Удаляем аватар, если передано явное null
            if (currentUser?.imageKey) {
                await deleteFromS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    currentUser.imageKey
                );
            }
            updateData.image = null;
            updateData.imageKey = null;
        }

        // Обновление пользователя
        const updatedUser = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.update({
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

            return user;
        });

        revalidateTag('user-profile');

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
