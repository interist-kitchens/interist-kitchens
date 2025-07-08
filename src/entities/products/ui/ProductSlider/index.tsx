'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Carousel, ConfigProvider } from 'antd';
import { ProductCoordinatesOverlay } from '@/entities/products';

type Props = {
    name: string;
    images: {
        image: string;
        blurImage?: string | null;
    }[];
    coordinates?: {
        id: number;
        x: number;
        y: number;
        relatedProduct?: {
            id: string;
            name: string;
            image: string;
            price: string;
        };
    }[];
};

export const ProductSlider: FC<Props> = ({
    name,
    images,
    coordinates = [],
}) => {
    return (
        <div className="w-full lg:w-8/12 group" style={{ minHeight: '500px' }}>
            <ConfigProvider
                theme={{
                    components: {
                        Carousel: {
                            dotActiveWidth: 24,
                            dotWidth: 12,
                            dotHeight: 4,
                        },
                        Tooltip: {
                            colorText: '#333',
                            borderRadius: 8,
                            boxShadow:
                                '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
                        },
                    },
                    token: {
                        colorBgContainer: '#5e94b9',
                        colorPrimary: '#1890ff',
                    },
                }}
            >
                <Carousel
                    arrows
                    dotPosition="left"
                    infinite={false}
                    draggable
                    className="h-full bg-white rounded-lg overflow-hidden shadow-lg relative"
                >
                    {images.map((image, index) => (
                        <div
                            key={`${image.image}-${index}`}
                            className="relative w-full h-[500px]"
                        >
                            {index === 0 ? (
                                <ProductCoordinatesOverlay
                                    imageSrc={image.image}
                                    imageAlt={`${name} - фото ${index + 1}`}
                                    coordinates={coordinates}
                                />
                            ) : (
                                <Image
                                    src={image.image}
                                    alt={`${name} - фото ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    placeholder={
                                        image.blurImage ? 'blur' : 'empty'
                                    }
                                    blurDataURL={image.blurImage ?? ''}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                    quality={85}
                                />
                            )}
                        </div>
                    ))}
                </Carousel>
            </ConfigProvider>
        </div>
    );
};
