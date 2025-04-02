import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';

export async function GET() {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const categories = await prisma.category.findMany();

        return NextResponse.json(categories ?? []);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch categories: ' + error },
            { status: 500 }
        );
    }
}
