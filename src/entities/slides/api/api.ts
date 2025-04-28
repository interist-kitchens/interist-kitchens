import type { Slide } from '@/entities/slides';
import { prisma } from '@/shared/prisma/prisma-client';
import { generateBlurImg } from '@/shared/lib/generateBlurImg';

export const getSlides = async (): Promise<Slide[] | undefined> => {
    try {
        const slides = await prisma.slide.findMany();

        return await Promise.all(
            slides.map(async (slide) => ({
                ...slide,
                imageBlur: await generateBlurImg(slide.imageSrc),
            }))
        );
    } catch (e) {
        console.error(e);
    }
};
