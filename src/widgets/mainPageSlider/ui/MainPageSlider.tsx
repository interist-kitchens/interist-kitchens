'use client';

import React from 'react';
import { Carousel } from 'antd';

import slide1Image from '@/app/assets/slider/slide1.webp';
import slide2Image from '@/app/assets/slider/slide2.webp';
import slide3Image from '@/app/assets/slider/slide3.webp';

import { ImageWithContent } from './ImageWithContent';
import { LinkButton } from './LinkButton';
import { Informer } from './Informer';
import { MainText } from './MainText';
import { SecondaryText } from './SecondaryText';
import { sliderContent } from '../config/constants';

export const MainPageSlider = () => {
    const { slide1, slide2, slide3 } = sliderContent;

    return (
        <Carousel arrows adaptiveHeight>
            <ImageWithContent src={slide1Image}>
                <MainText>{slide1.title}</MainText>
                <LinkButton href={slide1.href}>{slide1.buttonText}</LinkButton>
            </ImageWithContent>
            <ImageWithContent src={slide2Image}>
                <MainText>{slide2.title}</MainText>
                <Informer
                    text={slide2.informerTitle}
                    description={slide2.informerDescription}
                />
                <SecondaryText>{slide2.subTitle}</SecondaryText>
                <LinkButton href={slide2.href}>{slide2.buttonText}</LinkButton>
            </ImageWithContent>
            <ImageWithContent src={slide3Image}>
                <Informer text={slide3.informerTitle} />
                <SecondaryText>{slide3.subTitle}</SecondaryText>
                <LinkButton href={slide3.href}>{slide3.buttonText}</LinkButton>
            </ImageWithContent>
        </Carousel>
    );
};
