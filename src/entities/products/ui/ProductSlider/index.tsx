'use client';

import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Carousel, ConfigProvider, Tooltip } from 'antd';
import Link from 'next/link';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

type Props = {
    name: string;
    images: {
        image: string;
        blurImage?: string;
    }[];
    coordinates?: {
        id: number;
        x: number;
        y: number;
        link: string;
    }[];
};

export const ProductSlider: FC<Props> = ({
    name,
    images,
    coordinates = [],
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [imageSize, setImageSize] = useState<{
        width: number;
        height: number;
    } | null>(null);
    const [containerSize, setContainerSize] = useState<{
        width: number;
        height: number;
    }>({ width: 0, height: 0 });
    const breakPoint = useBreakpoint(true);

    // Получаем размеры изображения при загрузке
    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        console.log(img);
        setImageSize({
            width: img.offsetWidth,
            height: img.offsetHeight,
        });
    };

    // Следим за изменением размеров контейнера
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { width, height } =
                    containerRef.current.getBoundingClientRect();
                setContainerSize({ width, height });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Рассчитываем масштаб для координат
    const getScale = () => {
        if (!imageSize || !containerSize.width) return 1;
        return containerSize.width / imageSize.width;
    };

    const scale = getScale();

    return (
        <div
            className="w-full lg:w-8/12 group"
            style={{ minHeight: '500px' }}
            ref={containerRef}
        >
            <ConfigProvider
                theme={{
                    components: {
                        Carousel: {
                            dotActiveWidth: 24,
                            dotWidth: 12,
                            dotHeight: 4,
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
                            <Image
                                src={image.image}
                                alt={`${name} - фото ${index + 1}`}
                                fill
                                style={{
                                    objectFit: 'contain',
                                }}
                                placeholder={image.blurImage ? 'blur' : 'empty'}
                                blurDataURL={image.blurImage}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                priority={index === 0}
                                onLoad={
                                    index === 0 ? handleImageLoad : undefined
                                }
                            />
                            {/* Отображаем точки только на первом слайде */}
                            {index === 0 &&
                                coordinates.map((coord) => (
                                    <Tooltip
                                        key={coord.id}
                                        title={
                                            coord.link ? (
                                                <Link
                                                    href={coord.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-blue-300"
                                                >
                                                    {coord.link}
                                                </Link>
                                            ) : (
                                                'Нет ссылки'
                                            )
                                        }
                                        placement="top"
                                        color="rgba(0, 0, 0, 0.8)"
                                    >
                                        <div
                                            className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white cursor-pointer hover:bg-red-600 transition-all duration-200 hover:scale-125"
                                            style={{
                                                left: `${coord.x * scale}px`,
                                                top: `${coord.y * (breakPoint.xs ? 0.82 : 1)}px`,
                                            }}
                                        />
                                    </Tooltip>
                                ))}
                        </div>
                    ))}
                </Carousel>
            </ConfigProvider>
        </div>
    );
};
