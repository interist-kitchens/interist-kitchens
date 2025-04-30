'use client';

import { FC } from 'react';
import { Order } from '@/entities/orders';
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { dateFormat } from '@/shared/lib';

type Props = {
    orders: Order[];
};

interface DataType {
    key: number;
    name: string;
    mail: string | null;
    phone: string;
    status: string;
    product: string;
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
        title: 'Товар',
        dataIndex: 'product',
        key: 'product',
    },
    {
        title: 'Статус заказа',
        dataIndex: 'status',
        key: 'status',
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

export const OrderListAdmin: FC<Props> = ({ orders }) => {
    const data: DataType[] = orders.map((order) => ({
        key: order.id,
        name: order.name,
        mail: order.mail,
        phone: order.phone,
        status: order.status,
        product: order.products?.name,
        createdAt: order.createdAt,
    }));

    return <Table<DataType> columns={columns} dataSource={data} />;
};
