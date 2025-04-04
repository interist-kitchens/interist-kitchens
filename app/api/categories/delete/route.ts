import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';

export async function DELETE(request: Request) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const id = await request.json();

        const result = await prisma.category.delete({
            where: id,
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
