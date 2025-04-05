import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { put } from '@vercel/blob';

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
        const result = await prisma.category.delete({
            where: { id: Number.parseInt(params.id) },
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
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

        const categoryUpdated = await prisma.category.update({
            where: { id: Number.parseInt(params.id) },
            data: {
                name,
                alias,
                meta_title: metaTitle,
                meta_description: metaDescription,
                text,
                image: blob ? blob.url : '',
            },
        });

        return NextResponse.json(categoryUpdated);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
