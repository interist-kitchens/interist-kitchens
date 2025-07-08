'use client';

import { Tooltip, Typography } from 'antd';
import Image from 'next/image';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import {
    FC,
    SyntheticEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

const AXIOS_SCALE = 0.82;

const { Text } = Typography;

type Coordinate = {
    id: number;
    x: number;
    y: number;
    relatedProduct?: {
        id: string;
        name: string;
        image: string;
        price: string;
    };
};

type Props = {
    imageSrc: string;
    imageAlt: string;
    coordinates: Coordinate[];
};

export const ProductCoordinatesOverlay: FC<Props> = ({
    imageSrc,
    imageAlt,
    coordinates,
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

    const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        setImageSize({
            width: img.offsetWidth,
            height: img.offsetHeight,
        });
    };

    // Следим за изменением размеров контейнера
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const updateSize = () => {
            if (containerRef.current) {
                const { width, height } =
                    containerRef.current.getBoundingClientRect();
                setContainerSize({ width, height });
            }
        };

        const throttledUpdateSize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateSize, 100); // Троттлинг 100мс
        };

        const resizeObserver = new ResizeObserver(throttledUpdateSize);

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
            updateSize(); // Первоначальный вызов
        }

        return () => {
            resizeObserver.disconnect();
            clearTimeout(timeoutId);
        };
    }, []);

    const scale = useMemo(() => {
        if (!imageSize || !containerSize.width) return 1;
        const calculatedScale = containerSize.width / imageSize.width;
        return Math.min(calculatedScale, 2);
    }, [imageSize, containerSize.width]);

    return (
        <div className="relative w-full h-full" ref={containerRef}>
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                style={{ objectFit: 'contain' }}
                onLoad={handleImageLoad}
                priority
                quality={85}
            />

            {coordinates.map((coord) => {
                if (!coord.relatedProduct) return null;

                const positionNumber =
                    coordinates.findIndex((c) => c.id === coord.id) + 1;

                return (
                    <Tooltip
                        key={coord.id}
                        title={
                            <div className="max-w-xs p-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="flex-shrink-0 relative w-12 h-12">
                                            <Image
                                                src={coord.relatedProduct.image}
                                                alt={coord.relatedProduct.name}
                                                fill
                                                className="object-cover rounded"
                                                loading="lazy"
                                                sizes="50px"
                                                quality={75}
                                            />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex flex-col">
                                        <Text
                                            strong
                                            className="block"
                                            ellipsis={{
                                                tooltip:
                                                    coord.relatedProduct.name,
                                            }}
                                        >
                                            {coord.relatedProduct.name}
                                        </Text>
                                        <Text
                                            type="secondary"
                                            className="text-sm"
                                        >
                                            {coord.relatedProduct.price} ₽
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        }
                        placement="top"
                        color="#fff"
                        classNames={{
                            root: 'p-0',
                        }}
                    >
                        <div
                            className="absolute transition transform-[translateX(-1rem) translateY(-1rem) scale(0.999)] p-0 w-8 h-8 cursor-pointer
                            border-2 border-[rgba(0,0,0,0)] hover:border-[rgba(255,255,255,0.5)] bg-[rgba(17,17,17,0.2)] hover:bg-[rgba(0,0,0,0.4)] rounded-full leading-[0.5] flex items-center justify-center group/tooltip"
                            style={{
                                left: `${coord.x * (scale * AXIOS_SCALE)}px`,
                                top: `${coord.y * (breakPoint.xs ? AXIOS_SCALE : 1)}px`,
                            }}
                            aria-label={`Товар ${positionNumber}: ${coord.relatedProduct.name}`}
                        >
                            <div className="bg-white w-3 h-3 transition shadow-[0 1px 4px rgba(17,17,17,0.55)] rounded-full group-hover/tooltip:scale-75" />
                        </div>
                    </Tooltip>
                );
            })}
        </div>
    );
};
