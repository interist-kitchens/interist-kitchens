import { NextResponse } from 'next/server';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { put, PutBlobResult } from '@vercel/blob';
import { prisma } from '@/shared/prisma/prisma-client';
import { $Enums } from '@prisma/client';
import { revalidateTag } from 'next/cache';

export async function DELETE(
    _: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
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

        revalidateTag('products');

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const formData = await request.formData();
        const relationsRaw = formData.getAll('relations[]');

        const image = formData.get('image') as File | string;

        let blob: PutBlobResult | string | null = null;

        if (typeof image !== 'string') {
            const imageName = image.name ?? getUUID();

            blob = await put(`public/${imageName}`, image, {
                token:
                    process.env.NODE_ENV === 'production'
                        ? process.env.PROD_READ_WRITE_TOKEN
                        : process.env.NEXT_PUBLIC_READ_WRITE_TOKEN,
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
                        token:
                            process.env.NODE_ENV === 'production'
                                ? process.env.PROD_READ_WRITE_TOKEN
                                : process.env.NEXT_PUBLIC_READ_WRITE_TOKEN,
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

        const relations = relationsRaw.map((rel) =>
            JSON.parse(rel as string)
        ) as Array<{
            relatedProductId: number;
            type: $Enums.ProductRelationType;
        }>;

        // Удаляем старые связи
        await prisma.relatedProducts.deleteMany({
            where: { fromProductId: Number(params.id) },
        });

        // Добавляем новые связи
        if (relations.length > 0) {
            await prisma.relatedProducts.createMany({
                data: relations.map((rel) => ({
                    fromProductId: Number(params.id),
                    toProductId: rel.relatedProductId,
                    type: rel.type,
                })),
                skipDuplicates: true,
            });
        }

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
            include: { relatedFrom: { include: { toProduct: true } } },
        });

        revalidateTag('products');

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
