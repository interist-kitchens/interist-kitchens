'use client';

import { FC } from 'react';
import { Order } from '@/entities/orders';
import { Collapse, Table, TableProps, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { dateFormat } from '@/shared/lib';
import { $Enums } from '@prisma/client';

const { Panel } = Collapse;
const { Text } = Typography;

type Props = {
    orders: Order[];
};

interface DataType {
    key: number;
    name: string;
    email: string | null;
    phone: string;
    status: $Enums.OrderStatus;
    payment: $Enums.PaymentType;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    items: {
        productName: string;
        quantity: number;
        price: string;
        total: string;
    }[];
    totalAmount: number;
}

const statusColors: Record<$Enums.OrderStatus, string> = {
    PENDING: 'blue',
    FINISHED: 'green',
    CANCELED: 'red',
};

const paymentLabels: Record<$Enums.PaymentType, string> = {
    CASH: 'Наличные',
    CARD: 'Карта',
    ONLINE: 'Онлайн',
    BANK_TRANSFER: 'Перевод',
};

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        width: 80,
    },
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        width: 150,
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        width: 150,
    },
    {
        title: 'Способ оплаты',
        dataIndex: 'payment',
        key: 'payment',
        width: 120,
        render: (payment: $Enums.PaymentType) => paymentLabels[payment],
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (status: $Enums.OrderStatus) => (
            <Tag color={statusColors[status]}>
                {status === 'PENDING' && 'В обработке'}
                {status === 'FINISHED' && 'Завершен'}
                {status === 'CANCELED' && 'Отменен'}
            </Tag>
        ),
    },
    {
        title: 'Товары',
        key: 'products',
        render: (_, record) => (
            <Collapse ghost size="small">
                <Panel
                    header={`${record.items.length} товар(ов) на ${record.totalAmount} ₽`}
                    key="1"
                >
                    <div className="space-y-2">
                        {record.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <Text>
                                    {item.productName} × {item.quantity}
                                </Text>
                                <Text strong>{item.total} ₽</Text>
                            </div>
                        ))}
                    </div>
                </Panel>
            </Collapse>
        ),
    },
    {
        title: 'Создан',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
        defaultSortOrder: 'descend',
        sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
        render: (value) => dateFormat(value),
    },
];

export const OrderListAdmin: FC<Props> = ({ orders }) => {
    const data: DataType[] = orders.map((order) => {
        const items = order.items.map((item) => ({
            productName: item.product.name,
            quantity: item.quantity,
            price: item.priceAtOrder,
            total: Number(item.priceAtOrder) * item.quantity + ' ₽',
        }));

        const totalAmount = order.items.reduce(
            (sum, item) => sum + Number(item.priceAtOrder) * item.quantity,
            0
        );

        return {
            key: order.id,
            name: order.name,
            email: order.email,
            phone: order.phone,
            payment: order.payment,
            address: order.address,
            status: order.status,
            items,
            totalAmount,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    });

    return (
        <Table<DataType>
            columns={columns}
            dataSource={data}
            scroll={{ x: 1000 }}
            rowClassName="hover:bg-gray-50"
            expandable={{
                expandedRowRender: (record) => (
                    <div className="p-4 bg-gray-50">
                        <div className="mb-2">
                            <Text strong>Адрес доставки:</Text> {record.address}
                        </div>
                        <div className="mb-2">
                            <Text strong>E-Mail:</Text>{' '}
                            {record.email || 'Не указан'}
                        </div>
                        <div className="mb-2">
                            <Text strong>Товары:</Text>
                            <div className="mt-2 space-y-2">
                                {record.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between"
                                    >
                                        <Text>
                                            {item.productName} × {item.quantity}
                                        </Text>
                                        <Text>
                                            {item.price} ₽ × {item.quantity} ={' '}
                                            {item.total}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <Text strong>Итого: {record.totalAmount} ₽</Text>
                        </div>
                    </div>
                ),
            }}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
            }}
        />
    );
};
