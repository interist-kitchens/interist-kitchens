import { hash } from 'bcryptjs';
import { prisma } from '@/shared/prisma/prisma-client';
import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(req: Request) {
    try {
        const { name, email, password } = (await req.json()) as {
            name: string;
            email: string;
            password: string;
        };

        if (!name || !email || !password) {
            return new NextResponse(
                JSON.stringify({
                    message: 'Отсутствуют обязательные поля',
                    status: 'error',
                }),
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (existingUser) {
            return new NextResponse(
                JSON.stringify({
                    message: 'Такой Email уже занят',
                    status: 'error',
                }),
                { status: 409 }
            );
        }

        const hashedPassword = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Обработка специфичных ошибок Prisma
            if (error.code === 'P2002') {
                // Пример: ошибка уникального ограничения
                return new NextResponse(
                    JSON.stringify({
                        message: 'Такой Email уже занят',
                        status: 'error',
                    }),
                    { status: 409 }
                );
            }
        }

        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: error.message, status: 'error' }),
                { status: 500 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: 'Неизвестная ошибка',
                status: 'error',
            }),
            { status: 500 }
        );
    }
}
