'use client';

import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Flex } from 'antd';

type Props = {
    src: StaticImageData;
};

export const ImageWithContent: React.FC<React.PropsWithChildren<Props>> = ({
    src,
    children,
}) => {
    return (
        <div className="relative w-full h-full">
            <Image
                src={src}
                alt="Interist-kitchens-slider"
                className="w-full h-full"
                priority
            />
            <div className="absolute right-16 z-1 top-1/2 -translate-y-1/2">
                <Flex vertical gap={20} wrap className="max-w-[600px]">
                    {children}
                </Flex>
            </div>
        </div>
    );
};
