'use client';

import { FC, useEffect } from 'react';
import { Product, ProductRelation } from '@/entities/products';
import { message, Table, TableProps, Tag, Tooltip } from 'antd';
import { paths } from '@/shared/routing';
import { useRouter } from 'next/navigation';
import { DeleteProduct } from '@/features/products';
import { useUnit } from 'effector-react';
import { productDeleteAdminModel } from '@/entities/products/model';
import {
    relationTypeToColor,
    relationTypeToName,
} from '@/entities/products/lib';

interface DataType {
    key: string;
    name: string;
    alias: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    relations: Partial<ProductRelation>[];
}

type Props = {
    products?: Product[];
};

export const ProductAdminList: FC<Props> = ({ products }) => {
    const router = useRouter();
    const [isSuccess, reset] = useUnit([
        productDeleteAdminModel.$isSuccess,
        productDeleteAdminModel.reset,
    ]);

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Товар удален успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.refresh();
                });
        }
    }, [reset, isSuccess, router]);

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            width: 80,
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Tooltip title={`Категория: ${record.category}`}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Связи',
            dataIndex: 'relations',
            key: 'relations',
            render: (relations) => (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {relations?.map((rel: ProductRelation) => (
                        <Tooltip
                            key={rel.id}
                            title={`${relationTypeToName[rel.type]}: ${rel.name}`}
                        >
                            <Tag color={relationTypeToColor[rel.type]}>
                                {rel.name}
                            </Tag>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: 'Алиас',
            dataIndex: 'alias',
            key: 'alias',
        },
        {
            title: 'Создано',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
        },
        {
            title: 'Действия',
            key: 'actions',
            width: 100,
            render: (_, record) => <DeleteProduct id={record.key} />,
        },
    ];

    const data: DataType[] =
        products?.map((product) => ({
            key: product.id,
            name: product.name,
            category: product.categoryName || 'Без категории',
            alias: product.alias,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            relations:
                product.relatedProducts?.map((rel) => ({
                    id: rel.id,
                    name: rel.name,
                    type: rel.type,
                })) || [],
        })) ?? [];

    const handleClickRow = (id: string) => {
        router.push(`${paths.productsAdmin}/${id}`);
    };

    return (
        <Table<DataType>
            columns={columns}
            dataSource={data}
            onRow={(record) => ({
                onClick: () => handleClickRow(record.key),
                style: { cursor: 'pointer' },
            })}
            rowKey="key"
            scroll={{ x: true }}
        />
    );
};
