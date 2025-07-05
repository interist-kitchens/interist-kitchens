'use server';

import { getPlaiceholder } from 'plaiceholder';

export const generateBlurImg = async (imageUrl: string) => {
    try {
        // Используем fetch вместо axios
        const response = await fetch(imageUrl);

        // Получаем данные как ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        // Конвертируем ArrayBuffer в Buffer
        const buffer = Buffer.from(arrayBuffer);

        // Генерируем размытое изображение
        const { base64 } = await getPlaiceholder(buffer);

        return base64;
    } catch (e) {
        if (e instanceof Error) console.log(e.stack);
        return null; // Явно возвращаем null при ошибке
    }
};
