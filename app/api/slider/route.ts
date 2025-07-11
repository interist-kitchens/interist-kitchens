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

        const title = formData.get('title') as string;
        const subTitle = formData.get('subTitle') as string;
        const informerTitle = formData.get('informerTitle') as string;
        const informerDescription = formData.get(
            'informerDescription'
        ) as string;
        const buttonText = formData.get('buttonText') as string;
        const href = formData.get('href') as string;

        const slideImage = formData.get('image') as Blob | null;
        const originalSlideFilename = formData.get('imageName') as
            | string
            | null;

        let imageUrl = '';
        let s3Key = '';

        if (slideImage) {
            if (!originalSlideFilename) {
                return NextResponse.json(
                    { error: 'Имя файла обязательно' },
                    { status: 400 }
                );
            }

            try {
                const uploadResult = await uploadToS3(
                    process.env.NEXT_PUBLIC_S3_BUCKET ||
                        'b914fd021b76-interest-file',
                    slideImage,
                    originalSlideFilename
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

        const slide = await prisma.slide.create({
            data: {
                title,
                subTitle,
                informerTitle,
                buttonText,
                href,
                informerDescription,
                imageSrc: imageUrl,
                imageKey: s3Key,
            },
        });

        revalidateTag('slides');

        return NextResponse.json(slide);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
