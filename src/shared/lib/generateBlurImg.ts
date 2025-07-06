'use server';

import { getPlaiceholder } from 'plaiceholder';
import { unstable_cache } from 'next/cache';
import { s3Client } from '@/shared/lib/s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';

export const generateBlurImg = unstable_cache(
    async (imageUrl: string) => {
        try {
            // Проверяем, является ли URL ссылкой на S3
            const isS3Url = imageUrl.includes(
                process.env.NEXT_PUBLIC_S3_BUCKET!
            );

            let buffer: Buffer;

            if (isS3Url) {
                // Извлекаем ключ из URL
                const url = new URL(imageUrl);
                const key = url.pathname.substring(1); // Убираем первый слеш

                // Получаем изображение напрямую из S3
                const { Body } = await s3Client.send(
                    new GetObjectCommand({
                        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
                        Key: key,
                    })
                );

                const arrayBuffer = await Body?.transformToByteArray();
                buffer = Buffer.from(arrayBuffer!);
            } else {
                // Стандартная загрузка через fetch для других URL
                const response = await fetch(imageUrl);
                const arrayBuffer = await response.arrayBuffer();
                buffer = Buffer.from(arrayBuffer);
            }

            // Генерируем размытое изображение
            const { base64 } = await getPlaiceholder(buffer);
            return base64;
        } catch (e) {
            console.error('Error generating blur image:', e);
            return null;
        }
    },
    ['blur-image-generation'],
    {
        revalidate: 3600,
        tags: ['blur-images'],
    }
);
