import { NextResponse } from 'next/server';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { put, PutBlobResult } from '@vercel/blob';
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
        const result = await prisma.product.delete({
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

        const image = formData.get('image') as File | string;

        let blob: PutBlobResult | string | null = null;

        if (typeof image !== 'string') {
            const imageName = image.name ?? getUUID();

            blob = await put(`public/${imageName}`, image, {
                token: process.env.NEXT_PUBLIC_READ_WRITE_TOKEN,
                access: 'public',
            });
        } else {
            blob = image;
        }

        const files = formData.getAll('images[]') as (File | string)[];
        const uploadedFiles = files.filter((item) => typeof item === 'string');
        const newFiles = files.filter((item) => typeof item !== 'string');
        let blobs: PutBlobResult[] | null = null;

        if (Array.isArray(newFiles)) {
            blobs = await Promise.all(
                newFiles.map((file) =>
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

        const product = await prisma.product.update({
            where: { id: Number.parseInt(params.id) },
            data: {
                name,
                alias,
                metaTitle,
                metaDescription,
                text,
                image: typeof blob !== 'string' ? blob.url : blob,
                categoryId: parseInt(categoryId),
                price,
                images: blobs
                    ? [...uploadedFiles, ...blobs.map((blob) => blob.url)]
                    : [...uploadedFiles],
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
