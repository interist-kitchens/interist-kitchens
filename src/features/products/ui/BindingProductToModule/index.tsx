'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { Product } from '@/entities/products';
import Image from 'next/image';
import { Button, Popconfirm, Select, Table, TableProps } from 'antd';
import { useUnit } from 'effector-react';
import { productCoordinatesModel } from '@/entities/products/model';
import { useRouter } from 'next/navigation';

const { Option } = Select;

type Props = {
    product: Product;
};

export const BindingProductToModule: FC<Props> = ({ product }) => {
    const router = useRouter();
    const {
        coordinateAdded,
        coordinateDeleted,
        coordinateUpdated,
        $pending,
        $isSuccess,
    } = useUnit(productCoordinatesModel);

    const [imageSize, setImageSize] = useState<{
        width: number;
        height: number;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if ($isSuccess) {
            router.refresh();
        }
    }, [$isSuccess, router]);

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !imageSize) return;

        const rect = containerRef.current.getBoundingClientRect();

        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);

        coordinateAdded({
            productId: product.id,
            x,
            y,
            relatedProductId: null,
        });
    };

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        const newSize = {
            width: img.offsetWidth,
            height: img.offsetHeight,
        };
        setImageSize(newSize);
    };

    const handleUpdateRelatedProduct = (
        coordinateId: number,
        relatedProductId: string | null
    ) => {
        coordinateUpdated({
            coordinateId,
            relatedProductId: relatedProductId ? relatedProductId : null,
        });
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
            title: 'Связанный товар',
            dataIndex: 'relatedProductId',
            key: 'relatedProduct',
            render: (relatedProductId, record) => (
                <Select
                    style={{ width: '100%' }}
                    value={relatedProductId ? String(relatedProductId) : null}
                    onChange={(value) =>
                        handleUpdateRelatedProduct(record.id, value)
                    }
                    placeholder="Выберите товар"
                    allowClear
                >
                    {product.relatedProducts?.map((relatedProduct) => (
                        <Option
                            key={relatedProduct.id}
                            value={relatedProduct.id}
                        >
                            {relatedProduct.name}
                        </Option>
                    ))}
                </Select>
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
                    const relatedProduct = product.relatedProducts?.find(
                        (p) => p.id === String(coord.relatedProductId)
                    );

                    return (
                        <div
                            key={coord.id}
                            className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                            style={{
                                left: `${coord.x}px`,
                                top: `${coord.y}px`,
                            }}
                        >
                            {relatedProduct && (
                                <div className="absolute -top-6 -left-6 bg-white text-xs px-1 py-0.5 rounded shadow">
                                    {relatedProduct.name}
                                </div>
                            )}
                        </div>
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
                        width: '100%',
                    }}
                    loading={$pending}
                />
            </div>
        </section>
    );
};
