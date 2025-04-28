import type { Slide } from '@/entities/slides';
import React, { FC } from 'react';
import { ImageWithContent } from '@/widgets/mainPageSlider/ui/ImageWithContent';
import { MainText } from '@/widgets/mainPageSlider/ui/MainText';
import { Informer } from '@/widgets/mainPageSlider/ui/Informer';
import { SecondaryText } from '@/widgets/mainPageSlider/ui/SecondaryText';
import { LinkButton } from '@/widgets/mainPageSlider/ui/LinkButton';

type Props = Partial<Slide> & { key?: string | number; previewMode?: boolean };

export const SlideItem: FC<Props> = ({
    title,
    href,
    buttonText,
    subTitle,
    imageSrc,
    informerTitle,
    informerDescription,
    id,
    previewMode,
    imageBlur,
}) => (
    <ImageWithContent
        src={imageSrc}
        previewMode={previewMode}
        imageBlur={imageBlur}
        key={id}
    >
        <MainText previewMode={previewMode}>{title}</MainText>
        {informerTitle && (
            <Informer
                text={informerTitle}
                description={informerDescription}
                previewMode={previewMode}
            />
        )}
        {subTitle && (
            <SecondaryText previewMode={previewMode}>{subTitle}</SecondaryText>
        )}
        {href && (
            <LinkButton href={href} previewMode={previewMode}>
                {buttonText}
            </LinkButton>
        )}
    </ImageWithContent>
);
