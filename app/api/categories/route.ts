import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { put } from '@vercel/blob';

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

export async function POST(request: Request) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const formData = await request.formData();

        const image = formData.get('image') as Blob;
        const imageName = formData.get('imageName') ?? getUUID();
        let blob = null;

        if (image) {
            blob = await put(`public/${imageName}`, image, {
                token: process.env.NEXT_PUBLIC_READ_WRITE_TOKEN,
                access: 'public',
            });
        }

        const name = formData.get('name') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const text = formData.get('text') as string;
        const alias = formData.get('alias') as string;

        const category = await prisma.category.create({
            data: {
                name,
                alias,
                meta_title: metaTitle,
                meta_description: metaDescription,
                text,
                image: blob ? blob.url : '',
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
