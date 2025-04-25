import type { Slide } from '@/entities/slides';
import { prisma } from '@/shared/prisma/prisma-client';

export const getSlides = async (): Promise<Slide[]> => {
    const slides = await prisma.slide.findMany();

    return slides;
};
