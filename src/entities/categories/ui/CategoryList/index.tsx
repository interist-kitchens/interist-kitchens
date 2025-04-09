'use client';

import { FC, useEffect } from 'react';
import { Categories, categoryDeleteModel } from '@/entities/categories';
import { message, Table, TableProps } from 'antd';
import { DeleteCategory } from '@/features/categories';
import { useRouter } from 'next/navigation';
import { useUnit } from 'effector-react';
import { paths } from '@/shared/routing';

type Props = {
    categories: Categories[];
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
        render: (_, record) => <DeleteCategory id={record.key} />,
    },
];

export const CategoryList: FC<Props> = ({ categories }) => {
    const router = useRouter();

    const [isSuccess, reset] = useUnit([
        categoryDeleteModel.$isSuccess,
        categoryDeleteModel.reset,
    ]);

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Категория удалена успешно',
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

    const data: DataType[] = categories.map((category) => ({
        key: category.id,
        name: category.name,
        alias: category.alias,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
    }));

    const handleClickRow = (id: string) => {
        router.push(`${paths.categoriesAdmin}/${id}`);
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
