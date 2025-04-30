import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';

export async function DELETE(
    _: Request,
    { params }: { params: { id: string } }
) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const result = await prisma.page.delete({
            where: { id: Number.parseInt(params.id) },
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
