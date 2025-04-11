'use client';

import { FC, useEffect } from 'react';
import { Product } from '@/entities/products';
import { message, Table, TableProps } from 'antd';
import { paths } from '@/shared/routing';
import { useRouter } from 'next/navigation';
import { DeleteProduct } from '@/features/products';
import { useUnit } from 'effector-react';
import { productDeleteAdminModel } from '@/entities/products/model';

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
    {
        title: '',
        dataIndex: 'deleteAction',
        key: 'deleteAction',
        render: (_, record) => <DeleteProduct id={record.key} />,
    },
];

export const ProductList: FC<Props> = ({ products }) => {
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

    useEffect(() => {
        router.refresh();
    }, [router]);

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
