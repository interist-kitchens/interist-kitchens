'use client';

import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Flex } from 'antd';

type Props = {
    src?: string | StaticImageData;
    imageBlur?: string | null;
    previewMode?: boolean;
};

export const ImageWithContent: React.FC<React.PropsWithChildren<Props>> = ({
    src,
    children,
    previewMode,
    imageBlur,
}) => {
    const infoBlockClassName = `absolute ${previewMode ? 'right-4' : 'right-16'} z-1 top-1/2 -translate-y-1/2`;
    return (
        <div
            className={`relative w-full ${previewMode ? 'h-full pointer-events-none' : 'md:h-[60vh] xl:h-[70vh] pointer-events-auto'}`}
        >
            {src && (
                <Image
                    src={src}
                    alt="Interist-kitchens-slider"
                    fill
                    priority
                    placeholder={'blur'}
                    blurDataURL={imageBlur ?? ''}
                />
            )}
            <div className={infoBlockClassName}>
                <Flex
                    vertical
                    gap={previewMode ? 4 : 20}
                    wrap
                    className={`${previewMode ? 'max-w-[200px]' : 'max-w-[600px]'}`}
                >
                    {children}
                </Flex>
            </div>
        </div>
    );
};
