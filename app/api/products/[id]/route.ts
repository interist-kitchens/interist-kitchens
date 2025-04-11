import { NextResponse } from 'next/server';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { put } from '@vercel/blob';
import { prisma } from '@/shared/prisma/prisma-client';

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
        const categoryId = formData.get('categoryId') as string;

        const product = await prisma.product.update({
            where: { id: Number.parseInt(params.id) },
            data: {
                name,
                alias,
                metaTitle,
                metaDescription,
                text,
                image: blob ? blob.url : '',
                categoryId: parseInt(categoryId),
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
