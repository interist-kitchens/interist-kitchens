'use client';

import { FC } from 'react';
import { Page } from '@prisma/client';
import { Table, TableProps } from 'antd';

type Props = {
    pages?: Page[];
};

interface DataType {
    key: number;
    name: string;
    alias: string;
    createdAt: Date;
    updatedAt: Date;
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
        render: (_, record) => <>{record.key}</>,
    },
];

export const AdminPageList: FC<Props> = ({ pages }) => {
    const data: DataType[] =
        pages?.map((page) => ({
            key: page.id,
            name: page.name,
            alias: page.alias,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
        })) ?? [];

    return <Table<DataType> columns={columns} dataSource={data} />;
};
