'use client';

import { FC } from 'react';
import { Callback } from '@/entities/orders';
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { dateFormat } from '@/shared/lib';

type Props = {
    callbackList: Callback[];
};

interface DataType {
    key: number;
    name: string;
    mail: string | null;
    phone: string;
    createdAt: Date;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'E-Mail',
        dataIndex: 'mail',
        key: 'mail',
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Создано',
        dataIndex: 'createdAt',
        key: 'createdAt',
        defaultSortOrder: 'descend',
        sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
        render: (value) => dateFormat(value),
    },
];

export const CallbackAdminList: FC<Props> = ({ callbackList }) => {
    const data: DataType[] = callbackList.map((callback) => ({
        key: callback.id,
        name: callback.name,
        mail: callback.mail,
        phone: callback.phone,
        createdAt: callback.createdAt,
    }));

    return <Table<DataType> columns={columns} dataSource={data} />;
};
