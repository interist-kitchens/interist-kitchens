import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const data = await request.json();

        const category = await prisma.page.create({
            data,
        });

        revalidateTag('pages');

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
