'use client';

import { FC } from 'react';
import type { TableProps } from 'antd';
import { Space, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { dateFormat } from '@/shared/lib';
import { IndividualOrder } from '@/entities/orders';
import Image from 'next/image';

const { Text, Link } = Typography;

interface Props {
    orders: IndividualOrder[];
}

const columns: TableProps<IndividualOrder>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Клиент',
        key: 'client',
        render: (_, record) => (
            <Space direction="vertical" size={0}>
                <Text strong>{record.name}</Text>
                <Text type="secondary">{record.phone}</Text>
                {record.email && (
                    <Link href={`mailto:${record.email}`}>{record.email}</Link>
                )}
            </Space>
        ),
    },
    {
        title: 'Товар',
        key: 'product',
        render: (_, record) => (
            <Space>
                <Image
                    src={record.product.image}
                    alt={record.product.name}
                    style={{ width: 40, height: 40, objectFit: 'cover' }}
                />
                <Space direction="vertical" size={0}>
                    <Text strong>{record.product.name}</Text>
                    <Text type="secondary">{record.product.price} ₽</Text>
                </Space>
            </Space>
        ),
    },
    {
        title: 'Дата создания',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => dateFormat(date),
        sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
        defaultSortOrder: 'descend',
    },
];

export const IndividualsOrdersAdminList: FC<Props> = ({ orders }) => {
    return (
        <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
            }}
            scroll={{ x: 1000 }}
        />
    );
};
