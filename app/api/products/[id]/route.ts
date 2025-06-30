import { NextResponse } from 'next/server';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { put, PutBlobResult } from '@vercel/blob';
import { prisma } from '@/shared/prisma/prisma-client';
import { $Enums } from '@prisma/client';

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
        const relationsRaw = formData.getAll('relations[]');
        const attributesRaw = formData.getAll('attributes[]');

        const relations = relationsRaw.map((rel) =>
            JSON.parse(rel as string)
        ) as Array<{
            relatedProductId: number;
            type: $Enums.ProductRelationType;
        }>;

        const attributes = attributesRaw.map((attr) =>
            JSON.parse(attr as string)
        ) as Array<{
            attributeId: number;
            value: string;
            isPublic: boolean;
        }>;

        // Валидация данных
        if (!name || !categoryId || !price) {
            return NextResponse.json(
                { error: 'Required fields are missing' },
                { status: 400 }
            );
        }

        // Транзакция - либо все операции выполнятся, либо ни одна
        const product = await prisma.$transaction(async (tx) => {
            // 1. Удаляем старые связи
            await tx.relatedProducts.deleteMany({
                where: { fromProductId: Number(params.id) },
            });

            // 2. Удаляем старые атрибуты
            await tx.productAttributeValue.deleteMany({
                where: { productId: Number(params.id) },
            });

            // 3. Добавляем новые связи
            if (relations.length > 0) {
                await tx.relatedProducts.createMany({
                    data: relations.map((rel) => ({
                        fromProductId: Number(params.id),
                        toProductId: rel.relatedProductId,
                        type: rel.type,
                    })),
                    skipDuplicates: true,
                });
            }

            // 4. Добавляем новые атрибуты
            if (attributes.length > 0) {
                await tx.productAttributeValue.createMany({
                    data: attributes.map((attr) => ({
                        attributeId: attr.attributeId,
                        productId: Number(params.id),
                        value: attr.value,
                        isPublic: attr.isPublic,
                    })),
                    skipDuplicates: true,
                });
            }

            // 5. Обновляем основной продукт
            const product = await tx.product.update({
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
                include: {
                    relatedFrom: {
                        include: { toProduct: true },
                    },
                    attributes: {
                        include: {
                            attribute: true,
                        },
                    },
                },
            });

            return product;
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
