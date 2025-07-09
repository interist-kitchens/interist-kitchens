import type { Slide } from '@/entities/slides';
import { prisma } from '@/shared/prisma/prisma-client';
import { generateBlurImg } from '@/shared/lib/generateBlurImg';
import { unstable_cache } from 'next/cache';
import { createMutation } from '@farfetched/core';
import { createInternalRequestFx } from '@/shared/api/requests';

export const getSlides = unstable_cache(
    async (): Promise<Slide[] | undefined> => {
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
    },
    ['slides'],
    { tags: ['slides'] }
);

export const deleteSlide = createMutation({
    effect: createInternalRequestFx((id: string) => ({
        url: `/slider/${id}`,
        method: 'DELETE',
    })),
});
