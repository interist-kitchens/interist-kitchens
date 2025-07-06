import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
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
        // Сначала получаем категорию, чтобы проверить наличие изображения
        const category = await prisma.category.findUnique({
            where: { id: Number(params.id) },
            select: {
                id: true,
                imageKey: true,
            },
        });

        if (!category) {
            return NextResponse.json(
                { error: 'Категория не найдена' },
                { status: 404 }
            );
        }

        if (category.imageKey) {
            try {
                await deleteFromS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    category.imageKey
                );
            } catch (s3Error) {
                // Продолжаем удаление категории даже если не удалось удалить изображение
                console.error('Failed to delete image from S3:', s3Error);
            }
        }

        const result = await prisma.category.delete({
            where: { id: Number(params.id) },
        });

        revalidateTag('categories');

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
        const image = formData.get('image') as File | string | null;
        const originalFilename = formData.get('imageName') as string | null;
        const name = formData.get('name') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const text = formData.get('text') as string;
        const alias = formData.get('alias') as string;

        if (!name || !alias) {
            return NextResponse.json(
                { error: 'Имя и алиас категории обязательны' },
                { status: 400 }
            );
        }

        let imageUrl = '';
        let s3Key = '';

        // Получаем текущую категорию для проверки существующего изображения
        const currentCategory = await prisma.category.findUnique({
            where: { id: Number(params.id) },
        });

        if (image && typeof image !== 'string') {
            if (!originalFilename) {
                return NextResponse.json(
                    { error: 'Имя файла обязательно' },
                    { status: 400 }
                );
            }

            try {
                // Загружаем новое изображение
                const uploadResult = await uploadToS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    image,
                    originalFilename
                );
                imageUrl = uploadResult.url;
                s3Key = uploadResult.key;

                // Удаляем старое изображение, если оно существует
                if (currentCategory?.imageKey) {
                    await deleteFromS3(
                        process.env.NEXT_PUBLIC_S3_BUCKET ||
                            'b914fd021b76-interest-file',
                        currentCategory.imageKey
                    );
                }
            } catch (uploadError) {
                console.error('Upload failed:', uploadError);
                return NextResponse.json(
                    {
                        error:
                            uploadError instanceof Error
                                ? uploadError.message
                                : 'Ошибка загрузки файла',
                    },
                    { status: 400 }
                );
            }
        } else if (typeof image === 'string') {
            // Используем существующий URL
            imageUrl = image;
            s3Key = currentCategory?.imageKey || '';
        } else {
            // Если изображение не передано, но было ранее - удаляем его
            if (currentCategory?.imageKey) {
                await deleteFromS3(
                    process.env.S3_BUCKET || 'b914fd021b76-interest-file',
                    currentCategory.imageKey
                );
            }
        }

        const categoryUpdated = await prisma.category.update({
            where: { id: Number(params.id) },
            data: {
                name,
                alias,
                metaTitle,
                metaDescription,
                text,
                image: imageUrl,
                imageKey: s3Key,
            },
        });

        revalidateTag('categories');

        return NextResponse.json(categoryUpdated);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
