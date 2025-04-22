import React from 'react';
import { Carousel } from 'antd';
import { SlideItem } from '@/widgets/mainPageSlider/ui/SlideItem';
import { getSlides } from '@/entities/slides';

export const MainPageSlider = async () => {
    const slides = await getSlides();

    return (
        <Carousel arrows adaptiveHeight>
            {slides?.map((slideItem) => (
                <SlideItem {...slideItem} key={slideItem.id} />
            ))}
        </Carousel>
    );
};
