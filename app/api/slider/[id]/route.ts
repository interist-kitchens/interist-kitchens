import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { revalidateTag } from 'next/cache';
import { deleteFromS3 } from '@/shared/lib/s3';

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
        // Сначала получаем слайд, чтобы проверить наличие изображения
        const slide = await prisma.slide.findUnique({
            where: { id: Number(params.id) },
            select: {
                id: true,
                imageKey: true,
            },
        });

        if (!slide) {
            return NextResponse.json(
                { error: 'Слайд не найден' },
                { status: 404 }
            );
        }

        if (slide.imageKey) {
            try {
                await deleteFromS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    slide.imageKey
                );
            } catch (s3Error) {
                // Продолжаем удаление слайда, даже если не удалось удалить изображение
                console.error('Failed to delete image from S3:', s3Error);
            }
        }

        const result = await prisma.slide.delete({
            where: { id: Number(params.id) },
        });

        revalidateTag('slides');

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
