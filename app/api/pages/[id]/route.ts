import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { revalidateTag } from 'next/cache';

export async function DELETE(_: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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

        revalidateTag('pages');

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const data = await request.json();

        const pageUpdated = await prisma.page.update({
            where: { id: Number.parseInt(params.id) },
            data,
        });

        revalidateTag('pages');

        return NextResponse.json(pageUpdated);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
