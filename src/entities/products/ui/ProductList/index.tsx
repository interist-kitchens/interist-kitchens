'use client';

import { FC } from 'react';
import { Product } from '@/entities/products';
import { Table, TableProps } from 'antd';
import { paths } from '@/shared/routing';
import { useRouter } from 'next/navigation';

type Props = {
    products: Product[];
};

interface DataType {
    key: string;
    name: string;
    alias: string;
    createdAt: string;
    updatedAt: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Категория',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
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
    },
    {
        title: 'Обновлено',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
];

export const ProductList: FC<Props> = ({ products }) => {
    const router = useRouter();

    const data: DataType[] = products.map((product) => ({
        key: product.id,
        category: product.categoryName,
        name: product.name,
        alias: product.alias,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    }));

    const handleClickRow = (id: string) => {
        router.push(`${paths.productsAdmin}/${id}`);
    };

    return (
        <Table<DataType>
            columns={columns}
            dataSource={data}
            onRow={(record) => {
                return {
                    onClick: () => handleClickRow(record.key),
                };
            }}
        />
    );
};
