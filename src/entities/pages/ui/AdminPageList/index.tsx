'use client';

import { FC } from 'react';
import { Page } from '@prisma/client';
import { Table, TableProps } from 'antd';
import { dateFormat } from '@/shared/lib';
import { DeletePage } from '@/features/pages';

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
        render: (value) => dateFormat(value),
    },
    {
        title: 'Обновлено',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (value) => dateFormat(value),
    },
    {
        title: '',
        dataIndex: 'deleteAction',
        key: 'deleteAction',
        render: (_, record) => <DeletePage id={record.key} />,
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
