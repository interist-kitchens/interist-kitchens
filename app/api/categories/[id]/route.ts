import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const category = await prisma.category.findUnique({
            where: { id: Number.parseInt(params.id) },
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
