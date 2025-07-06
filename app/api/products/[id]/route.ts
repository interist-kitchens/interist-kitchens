import { NextResponse } from 'next/server';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { prisma } from '@/shared/prisma/prisma-client';
import { $Enums } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { deleteFromS3, uploadToS3 } from '@/shared/lib/s3';

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

        const name = formData.get('name') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const text = formData.get('text') as string;
        const alias = formData.get('alias') as string;
        const categoryId = formData.get('categoryId') as string;
        const price = formData.get('price') as string;

        const relationsRaw = formData.getAll('relations[]');

        const image = formData.get('image') as File | string;

        const files = formData.getAll('images[]') as (File | string)[];

        let imageUrl = '';
        let imageKey = '';

        const currentProduct = await prisma.product.findUnique({
            where: { id: Number(params.id) },
            select: {
                imageKey: true,
                imageKeys: true,
            },
        });

        if (!currentProduct) {
            return NextResponse.json(
                { error: 'Товар не найден' },
                { status: 404 }
            );
        }

        // 1. Обработка основного изображения
        if (image && typeof image !== 'string') {
            try {
                // Загружаем новое изображение
                const uploadResult = await uploadToS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    image,
                    image.name ||
                        `product-${getUUID()}.${image.type.split('/')[1] || 'jpg'}`
                );
                imageUrl = uploadResult.url;
                imageKey = uploadResult.key;

                // Удаляем старое изображение, если оно существует
                if (currentProduct.imageKey) {
                    await deleteFromS3(
                        process.env.NEXT_PUBLIC_S3_BUCKET ||
                            'b914fd021b76-interest-file',
                        currentProduct.imageKey
                    );
                }
            } catch (uploadError) {
                console.error('Main image upload failed:', uploadError);
                return NextResponse.json(
                    { error: 'Ошибка загрузки основного изображения' },
                    { status: 400 }
                );
            }
        } else if (typeof image === 'string') {
            // Используем существующее изображение
            imageUrl = image;
            imageKey = currentProduct.imageKey || '';
        } else {
            // Если изображение не передано, но было ранее - удаляем его
            if (currentProduct.imageKey) {
                await deleteFromS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    currentProduct.imageKey
                );
            }
        }

        // 2. Обработка дополнительных изображений
        const existingImages = files.filter(
            (item) => typeof item === 'string'
        ) as string[];
        const newImages = files.filter(
            (item) => typeof item !== 'string'
        ) as File[];

        let newImageUrls: string[] = [];
        let newImageKeys: string[] = [];

        if (newImages.length > 0) {
            try {
                const uploadResults = await Promise.all(
                    newImages.map((file) =>
                        uploadToS3(
                            process.env.NEXT_PUBLIC_S3_BUCKET ||
                                'b914fd021b76-interest-file',
                            file,
                            file.name ||
                                `product-additional-${getUUID()}.${file.type.split('/')[1] || 'jpg'}`
                        )
                    )
                );

                newImageUrls = uploadResults.map((r) => r.url);
                newImageKeys = uploadResults.map((r) => r.key);
            } catch (uploadError) {
                console.error('Additional images upload failed:', uploadError);

                // Удаляем уже загруженные новые изображения при ошибке
                await Promise.all(
                    newImageKeys.map((key) =>
                        deleteFromS3(process.env.S3_BUCKET!, key)
                    )
                );

                return NextResponse.json(
                    { error: 'Ошибка загрузки дополнительных изображений' },
                    { status: 400 }
                );
            }
        }

        // Удаляем старые дополнительные изображения, которые больше не нужны
        const imagesToKeep = existingImages;
        const imagesToDelete =
            currentProduct.imageKeys?.filter(
                (key) => !imagesToKeep.some((url) => url.includes(key))
            ) || [];

        if (imagesToDelete.length > 0) {
            await Promise.all(
                imagesToDelete.map((key) =>
                    deleteFromS3(process.env.NEXT_PUBLIC_S3_BUCKET!, key)
                )
            );
        }

        const relations = relationsRaw.map((rel) =>
            JSON.parse(rel as string)
        ) as Array<{
            relatedProductId: number;
            type: $Enums.ProductRelationType;
        }>;

        const result = await prisma.$transaction(async (prisma) => {
            try {
                // 1. Удаление старых связей
                await prisma.relatedProducts.deleteMany({
                    where: { fromProductId: Number(params.id) },
                });

                // 2. Добавление новых связей
                if (relations.length > 0) {
                    await prisma.relatedProducts.createMany({
                        data: relations.map((rel) => ({
                            fromProductId: Number(params.id),
                            toProductId: Number(rel.relatedProductId),
                            type: rel.type,
                        })),
                        skipDuplicates: true,
                    });
                }

                // 3. Обновление товара
                const updatedProduct = await prisma.product.update({
                    where: { id: Number(params.id) },
                    data: {
                        name,
                        alias,
                        metaTitle,
                        metaDescription,
                        text,
                        image: imageUrl,
                        imageKey: imageKey,
                        categoryId: parseInt(categoryId),
                        price,
                        images: [...existingImages, ...newImageUrls],
                        imageKeys: [
                            ...(currentProduct.imageKeys?.filter((key) =>
                                imagesToKeep.some((url) => url.includes(key))
                            ) || []),
                            ...newImageKeys,
                        ],
                    },
                    include: { relatedFrom: { include: { toProduct: true } } },
                });

                return updatedProduct;
            } catch (error) {
                // В случае ошибки откатываем всю транзакцию
                console.error('Transaction error:', error);
                throw error;
            }
        });

        revalidateTag('products');

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
