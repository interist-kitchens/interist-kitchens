'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { Product } from '@/entities/products';
import Image from 'next/image';
import type { TableProps } from 'antd';
import { Button, Input, Popconfirm, Table } from 'antd';
import { useUnit } from 'effector-react';
import { productCoordinatesModel } from '@/entities/products/model';

type Props = {
    product: Product;
};

export const BindingProductToModule: FC<Props> = ({ product }) => {
    const { coordinateAdded, coordinateDeleted, $pending } = useUnit(
        productCoordinatesModel
    );

    const [imageSize, setImageSize] = useState<{
        width: number;
        height: number;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !imageSize) return;

        const rect = containerRef.current.getBoundingClientRect();
        const scale = imageSize.width / rect.width;
        const x = Math.round((e.clientX - rect.left) * scale);
        const y = Math.round((e.clientY - rect.top) * scale);

        coordinateAdded({
            productId: product.id,
            x,
            y,
            link: '',
        });
    };

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        const newSize = {
            width: img.offsetWidth,
            height: img.offsetHeight,
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

    const handleUpdateLink = (id: number, link: string) => {
        // TODO заменить на привязку товара
        console.log(id, link);
    };

    const columns: TableProps<(typeof product.coordinates)[0]>['columns'] = [
        {
            title: 'X (px)',
            dataIndex: 'x',
            key: 'x',
            width: 100,
        },
        {
            title: 'Y (px)',
            dataIndex: 'y',
            key: 'y',
            width: 100,
        },
        {
            title: 'Ссылка',
            dataIndex: 'link',
            key: 'link',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleUpdateLink(record.id, e.target.value)
                    }
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
                    onConfirm={() =>
                        coordinateDeleted({
                            coordinateId: record.id,
                            productId: product.id,
                        })
                    }
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
                    width: '970px',
                    height: '500px',
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

                {product?.coordinates?.map((coord) => {
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
                    dataSource={product.coordinates}
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
                    loading={$pending}
                />
            </div>
        </section>
    );
};
