import { NextResponse } from 'next/server';
import { getUUID } from 'rc-select/lib/hooks/useId';
import { put } from '@vercel/blob';
import { prisma } from '@/shared/prisma/prisma-client';
import { $Enums } from '@prisma/client';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const formData = await request.formData();

        // 1. Загрузка изображений
        const image = formData.get('image') as File;
        const imageName = image.name ?? getUUID();
        const blob = await put(`public/${imageName}`, image, {
            token:
                process.env.NODE_ENV === 'production'
                    ? process.env.PROD_READ_WRITE_TOKEN
                    : process.env.NEXT_PUBLIC_READ_WRITE_TOKEN,
            access: 'public',
        });

        const files = formData.getAll('images[]') as File[];
        let blobs = null;

        if (Array.isArray(files)) {
            blobs = await Promise.all(
                files.map((file) =>
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

        // 2. Парсинг данных товара
        const name = formData.get('name') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const text = formData.get('text') as string;
        const alias = formData.get('alias') as string;
        const categoryId = formData.get('categoryId') as string;
        const price = formData.get('price') as string;
        const relationsEntries = formData.getAll('relations[]');
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

        // 3. Валидация связей
        if (relations.some((rel) => !rel.relatedProductId || !rel.type)) {
            return NextResponse.json(
                { error: 'Некорректные данные связей' },
                { status: 400 }
            );
        }

        // Проверяем существование товаров
        const relatedProductIds = relations.map((rel) => rel.relatedProductId);
        const existingProducts = await prisma.product.findMany({
            where: { id: { in: relatedProductIds } },
            select: { id: true },
        });

        // Если какие-то товары не найдены
        if (existingProducts.length !== relatedProductIds.length) {
            const missingIds = relatedProductIds.filter(
                (id) => !existingProducts.some((p) => p.id === id)
            );
            return NextResponse.json(
                { error: `Товары не найдены: ${missingIds.join(', ')}` },
                { status: 404 }
            );
        }

        // 4. Создаем товар и связи в транзакции
        const result = await prisma.$transaction(async (prisma) => {
            // Создаем товар
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

            // Фильтруем связи, исключая ссылку на себя
            const validRelations = relations.filter(
                (rel) => rel.relatedProductId !== product.id
            );

            // Добавляем связи (если они есть)
            if (validRelations.length > 0) {
                await prisma.relatedProducts.createMany({
                    data: relations.map((rel) => ({
                        fromProductId: product.id,
                        toProductId: rel.relatedProductId,
                        type: rel.type,
                    })),
                    skipDuplicates: true, // Пропускаем дубликаты
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
