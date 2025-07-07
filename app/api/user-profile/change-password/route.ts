import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { prisma } from '@/shared/prisma/prisma-client';
import { compare, hash } from 'bcryptjs';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, oldPassword, newPassword } = await request.json();

    try {
        // Проверка прав доступа
        if (session.user.id !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { password: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Пользователь не найден' },
                { status: 404 }
            );
        }

        // Проверка старого пароля
        const isValid = await compare(oldPassword, user.password);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Неверный текущий пароль' },
                { status: 400 }
            );
        }

        // Хеширование нового пароля
        const hashedPassword = await hash(newPassword, 10);

        // Обновление пароля
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Password change error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
