'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { Product } from '@/entities/products';
import Image from 'next/image';
import type { TableProps } from 'antd';
import { Button, Input, Popconfirm, Table } from 'antd';

type Props = {
    product: Product;
};

type CoordinateItem = {
    id: string;
    x: number;
    y: number;
    link: string;
};

export const BindingProductToModule: FC<Props> = ({ product }) => {
    const [coordinates, setCoordinates] = useState<CoordinateItem[]>([]);
    const [imageSize, setImageSize] = useState<{
        width: number;
        height: number;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const scale = rect.width / (imageSize?.width || 1);
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;

        const newItem: CoordinateItem = {
            id: Date.now().toString(),
            x: Math.round(x),
            y: Math.round(y),
            link: '',
        };

        setCoordinates([...coordinates, newItem]);
    };

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        const newSize = {
            width: img.naturalWidth,
            height: img.naturalHeight,
        };
        setImageSize(newSize);

        // Устанавливаем ширину контейнера по ширине изображения
        if (containerRef.current) {
            const maxWidth = Math.min(newSize.width, window.innerWidth - 40); // 40px для отступов
            setContainerWidth(maxWidth);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (imageSize && containerRef.current) {
                const maxWidth = Math.min(
                    imageSize.width,
                    window.innerWidth - 40
                );
                setContainerWidth(maxWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imageSize]);

    const deleteCoordinate = (id: string) => {
        setCoordinates(coordinates.filter((item) => item.id !== id));
    };

    const updateLink = (id: string, newLink: string) => {
        setCoordinates(
            coordinates.map((item) =>
                item.id === id ? { ...item, link: newLink } : item
            )
        );
    };

    const columns: TableProps<CoordinateItem>['columns'] = [
        {
            title: 'X (px от левого края)',
            dataIndex: 'x',
            key: 'x',
            width: 150,
        },
        {
            title: 'Y (px от верхнего края)',
            dataIndex: 'y',
            key: 'y',
            width: 150,
        },
        {
            title: 'Ссылка',
            dataIndex: 'link',
            key: 'link',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => updateLink(record.id, e.target.value)}
                    placeholder="Введите URL"
                />
            ),
        },
        {
            title: 'Действия',
            key: 'actions',
            width: 100,
            render: (_, record) => (
                <Popconfirm
                    title="Удалить эту точку?"
                    onConfirm={() => deleteCoordinate(record.id)}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button danger type="link">
                        Удалить
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <section className="space-y-4">
            <div className="text-sm mb-2">
                {imageSize && (
                    <span>
                        Размер изображения: {imageSize.width} ×{' '}
                        {imageSize.height} px
                    </span>
                )}
            </div>

            <div
                ref={containerRef}
                className="relative cursor-crosshair border border-dashed border-gray-300 mx-auto"
                style={{
                    width: containerWidth ? `${containerWidth}px` : 'auto',
                    height:
                        containerWidth && imageSize
                            ? `${(containerWidth / imageSize.width) * imageSize.height}px`
                            : '500px',
                }}
                onClick={handleImageClick}
            >
                <Image
                    src={product.image}
                    alt={`${product.name}`}
                    fill
                    style={{
                        objectFit: 'contain',
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    onLoad={handleImageLoad}
                />

                {coordinates.map((coord) => {
                    if (!imageSize) return null;
                    const scale = containerWidth / imageSize.width;
                    return (
                        <div
                            key={coord.id}
                            className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                            style={{
                                left: `${coord.x * scale}px`,
                                top: `${coord.y * scale}px`,
                            }}
                        />
                    );
                })}
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Кликните по изображению, чтобы добавить точку. Координаты
                    рассчитываются от левого верхнего угла изображения.
                </p>
            </div>

            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={coordinates}
                    rowKey="id"
                    pagination={false}
                    size="small"
                    locale={{
                        emptyText:
                            'Нет добавленных точек. Кликните по изображению, чтобы добавить.',
                    }}
                    style={{
                        width: containerWidth || '100%',
                    }}
                />
            </div>
        </section>
    );
};
