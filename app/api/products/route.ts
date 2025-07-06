import { NextResponse } from 'next/server';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { prisma } from '@/shared/prisma/prisma-client';
import { $Enums } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { deleteFromS3, uploadToS3 } from '@/shared/lib/s3';

export async function POST(request: Request) {
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

        const relationsEntries = formData.getAll('relations[]');

        const mainImage = formData.get('image') as File | null;
        let mainImageUrl = '';
        let mainImageKey = '';

        const additionalImages = formData.getAll('images[]') as File[];
        let additionalImageUrls: string[] = [];
        let additionalImageKeys: string[] = [];

        if (!name || !alias || !categoryId || !price) {
            return NextResponse.json(
                { error: 'Не заполнены обязательные поля' },
                { status: 400 }
            );
        }

        // 1. Загрузка основного изображения
        if (mainImage) {
            try {
                const uploadResult = await uploadToS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    mainImage,
                    mainImage.name ||
                        `product-${getUUID()}.${mainImage.type.split('/')[1] || 'jpg'}`
                );
                mainImageUrl = uploadResult.url;
                mainImageKey = uploadResult.key;
            } catch (uploadError) {
                console.error('Main image upload failed:', uploadError);
                return NextResponse.json(
                    { error: 'Ошибка загрузки основного изображения' },
                    { status: 400 }
                );
            }
        }

        // 2. Загрузка дополнительных изображений
        if (additionalImages.length > 0) {
            try {
                const uploadResults = await Promise.all(
                    additionalImages.map((file) =>
                        uploadToS3(
                            process.env.NEXT_PUBLIC_S3_BUCKET ||
                                'b914fd021b76-interest-file',
                            file,
                            file.name ||
                                `product-additional-${getUUID()}.${file.type.split('/')[1] || 'jpg'}`
                        )
                    )
                );

                additionalImageUrls = uploadResults.map((r) => r.url);
                additionalImageKeys = uploadResults.map((r) => r.key);
            } catch (uploadError) {
                console.error('Additional images upload failed:', uploadError);

                // Удаляем уже загруженные изображения при ошибке
                await Promise.all(
                    [mainImageKey, ...additionalImageKeys]
                        .filter(Boolean)
                        .map((key) =>
                            deleteFromS3(
                                process.env.NEXT_PUBLIC_S3_BUCKET!,
                                key!
                            )
                        )
                );

                return NextResponse.json(
                    { error: 'Ошибка загрузки дополнительных изображений' },
                    { status: 400 }
                );
            }
        }

        // 5. Валидация связей
        const relations = relationsEntries
            .map((entry) => {
                try {
                    return JSON.parse(entry as string);
                } catch {
                    return null;
                }
            })
            .filter(Boolean) as {
            relatedProductId: number;
            type: $Enums.ProductRelationType;
            productName: string;
        }[];

        if (relations.some((rel) => !rel.relatedProductId || !rel.type)) {
            await Promise.all(
                [mainImageKey, ...additionalImageKeys]
                    .filter(Boolean)
                    .map((key) =>
                        deleteFromS3(process.env.NEXT_PUBLIC_S3_BUCKET!, key!)
                    )
            );

            return NextResponse.json(
                { error: 'Некорректные данные связей' },
                { status: 400 }
            );
        }

        // 6. Проверка существования связанных товаров
        const relatedProductIds = relations.map((rel) => rel.relatedProductId);
        const existingProducts = await prisma.product.findMany({
            where: { id: { in: relatedProductIds } },
            select: { id: true },
        });

        if (existingProducts.length !== relatedProductIds.length) {
            const missingIds = relatedProductIds.filter(
                (id) => !existingProducts.some((p) => p.id === id)
            );

            await Promise.all(
                [mainImageKey, ...additionalImageKeys]
                    .filter(Boolean)
                    .map((key) =>
                        deleteFromS3(process.env.NEXT_PUBLIC_S3_BUCKET!, key!)
                    )
            );

            return NextResponse.json(
                { error: `Товары не найдены: ${missingIds.join(', ')}` },
                { status: 404 }
            );
        }

        // 7. Создание товара и связей в транзакции
        const result = await prisma.$transaction(async (prisma) => {
            // Создаем товар
            const product = await prisma.product.create({
                data: {
                    name,
                    alias,
                    metaTitle,
                    metaDescription,
                    text,
                    image: mainImageUrl,
                    imageKey: mainImageKey,
                    categoryId: parseInt(categoryId),
                    price,
                    images: additionalImageUrls,
                    imageKeys: additionalImageKeys,
                },
            });

            // Фильтруем связи, исключая ссылку на себя
            const validRelations = relations.filter(
                (rel) => rel.relatedProductId !== product.id
            );

            // Добавляем связи (если они есть)
            if (validRelations.length > 0) {
                await prisma.relatedProducts.createMany({
                    data: validRelations.map((rel) => ({
                        fromProductId: product.id,
                        toProductId: rel.relatedProductId,
                        type: rel.type,
                    })),
                    skipDuplicates: true,
                });
            }

            return product;
        });

        revalidateTag('products');

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
