'use client';

import { Flex, Tag, Typography } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { paths } from '@/shared/routing';
import { FC } from 'react';
import {
    relationTypeToColor,
    relationTypeToName,
} from '@/entities/products/lib';
import { ProductRelation } from '@/entities/products';

const { Title, Text } = Typography;

type Props = {
    relations: ProductRelation[];
    title?: string;
    className?: string;
};

export const ProductRelationsList: FC<Props> = ({
    relations,
    title = 'Связанные товары',
    className = '',
}) => {
    if (!relations || relations.length === 0) return null;

    return (
        <div className={`bg-white p-4 rounded-md ${className}`}>
            <Title level={4} className="mb-4">
                {title}
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relations.map((product) => (
                    <Link
                        key={product.id}
                        href={`${paths.productsAdmin}/${product.id}`}
                        className="hover:bg-gray-50 transition-colors p-3 rounded border"
                    >
                        <Flex align="center" gap={12}>
                            {product.image && (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                            )}
                            <Flex vertical>
                                <Text strong>{product.name}</Text>
                                <Flex gap={8} align="center">
                                    <Tag
                                        color={
                                            relationTypeToColor[product.type]
                                        }
                                    >
                                        {relationTypeToName[product.type]}
                                    </Tag>
                                    <Text type="secondary">
                                        {product.price}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Link>
                ))}
            </div>
        </div>
    );
};
