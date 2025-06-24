'use client';

import { Button, Card, Flex, Typography } from 'antd';
import { paths } from '@/shared/routing';
import Link from 'next/link';
import { $Enums } from '@prisma/client';
import { FC } from 'react';
import Image from 'next/image';
import { ProductRelation } from '@/entities/products';

const { Title, Text } = Typography;
const { Meta } = Card;

type Props = {
    relations: ProductRelation[];
    title: string;
    relationType?: $Enums.ProductRelationType;
};

const relationTypeToTitle: Record<$Enums.ProductRelationType, string> = {
    BUNDLE: 'Модули',
    SIMILAR: 'Похожие товары',
    UPSELL: 'Рекомендуем добавить',
    CROSS_SELL: 'Сопутствующие товары',
};

export const ProductRelations: FC<Props> = ({
    relations,
    title,
    relationType,
}) => {
    if (!relations || relations.length === 0) return null;

    const displayTitle =
        title ||
        (relationType ? relationTypeToTitle[relationType] : 'Связанные товары');

    return (
        <div className="mt-12">
            <Title level={3} className="mb-6">
                {displayTitle}
            </Title>
            <div
                className="grid gap-6"
                style={{
                    gridTemplateColumns: `repeat(auto-fill, minmax(240px, 1fr))`,
                }}
            >
                {relations.map((product) => (
                    <Link
                        key={product.id}
                        href={`${paths.catalog}/${product.categoryAlias}/${product.alias}`}
                    >
                        <Card
                            hoverable
                            cover={
                                product.image ? (
                                    <div className="relative h-48">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                                        <Text type="secondary">
                                            Нет изображения
                                        </Text>
                                    </div>
                                )
                            }
                        >
                            <Meta
                                title={product.name}
                                description={
                                    <Flex vertical gap={8} className="mt-4">
                                        <Text strong className="text-lg">
                                            {`от ${Intl.NumberFormat('ru-RU', {
                                                style: 'currency',
                                                currency: 'RUB',
                                                maximumFractionDigits: 0,
                                            }).format(
                                                parseInt(product.price)
                                            )}`}
                                        </Text>
                                        <Button>В корзину</Button>
                                    </Flex>
                                }
                            />
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};
