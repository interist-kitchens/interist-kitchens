import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { revalidateTag } from 'next/cache';
import { uploadToS3 } from '@/shared/lib/s3';

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

        if (!name || !alias) {
            return NextResponse.json(
                { error: 'Имя и алиас категории обязательны' },
                { status: 400 }
            );
        }

        const image = formData.get('image') as Blob | null;
        const originalFilename = formData.get('imageName') as string | null;

        let imageUrl = '';
        let s3Key = '';

        if (image) {
            if (!originalFilename) {
                return NextResponse.json(
                    { error: 'Имя файла обязательно' },
                    { status: 400 }
                );
            }

            try {
                const uploadResult = await uploadToS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    image,
                    originalFilename
                );
                imageUrl = uploadResult.url;
                s3Key = uploadResult.key;
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
        }

        const category = await prisma.category.create({
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

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
