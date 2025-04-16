import { NextResponse } from 'next/server';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { put } from '@vercel/blob';
import { prisma } from '@/shared/prisma/prisma-client';

export async function POST(request: Request) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const formData = await request.formData();

        const image = formData.get('image') as File;
        const imageName = image.name ?? getUUID();
        const blob = await put(`public/${imageName}`, image, {
            token: process.env.NEXT_PUBLIC_READ_WRITE_TOKEN,
            access: 'public',
        });

        const files = formData.getAll('images[]') as File[];
        let blobs = null;

        if (Array.isArray(files)) {
            blobs = await Promise.all(
                files.map((file) =>
                    put(`public/${file.name}`, file, {
                        token: process.env.NEXT_PUBLIC_READ_WRITE_TOKEN,
                        access: 'public',
                    })
                )
            );
        }

        const name = formData.get('name') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const text = formData.get('text') as string;
        const alias = formData.get('alias') as string;
        const categoryId = formData.get('categoryId') as string;
        const price = formData.get('price') as string;

        const product = await prisma.product.create({
            data: {
                name,
                alias,
                metaTitle,
                metaDescription,
                text,
                image: blob ? blob.url : '',
                categoryId: parseInt(categoryId),
                price,
                images: blobs ? blobs.map((blob) => blob.url) : [],
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
