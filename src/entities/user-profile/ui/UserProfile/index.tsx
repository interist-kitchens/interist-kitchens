'use client';

import {
    Avatar,
    Badge,
    Button,
    Card,
    Descriptions,
    Flex,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Title } from '@/shared/ui/Typography';
import { FC } from 'react';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import { User } from '@/entities/user-profile';
import { UserOrder } from '@/entities/orders';

const { Text } = Typography;
const { Item: DescriptionsItems } = Descriptions;

const roleColors = {
    ADMIN: 'red',
    USER: 'blue',
};

const statusColors = {
    PENDING: 'gold',
    FINISHED: 'green',
    CANCELED: 'red',
};

type Props = {
    user: User;
    orders?: UserOrder[] | null;
};

export const UserProfile: FC<Props> = ({ user, orders = [] }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Дата',
            dataIndex: 'createdAt',
            key: 'date',
            render: (date: Date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status: keyof typeof statusColors) => (
                <Badge color={statusColors[status]} text={status} />
            ),
        },
        {
            title: 'Товары',
            dataIndex: 'items',
            key: 'items',
            render: (items: UserOrder['items']) => (
                <Space direction="vertical">
                    {items.map((item, index) => (
                        <Text key={index}>
                            {item.product.name} × {item.quantity} -{' '}
                            {item.product.price} ₽
                        </Text>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Сумма',
            key: 'total',
            render: (_: unknown, record: UserOrder) => {
                const total = record.items.reduce(
                    (sum, item) =>
                        sum + parseFloat(item.product.price) * item.quantity,
                    0
                );
                return <Text strong>{total.toFixed(2)} ₽</Text>;
            },
        },
    ];

    return (
        <div className="space-y-6 container mx-auto my-8">
            <Card
                title={
                    <Flex align="center" gap={16}>
                        <Title level={4} className="m-0">
                            Профиль пользователя
                        </Title>
                        <Tag color={roleColors[user.role]} className="text-xs">
                            {user.role}
                        </Tag>
                    </Flex>
                }
                extra={
                    <Link href={paths.profileEdit}>
                        <Button icon={<EditOutlined />}>Редактировать</Button>
                    </Link>
                }
                className="w-full my-6"
            >
                <Flex align="center" gap={24} className="mb-8">
                    <Avatar
                        size={96}
                        src={user.image}
                        icon={!user.image && <UserOutlined />}
                        className="bg-gray-100"
                    />
                    <Flex vertical>
                        <Title level={3} className="m-0">
                            {user.name || 'Без имени'}
                        </Title>
                        <Text type="secondary">{user.email}</Text>
                    </Flex>
                </Flex>

                <Descriptions bordered column={1}>
                    <DescriptionsItems label="ID пользователя">
                        <Text copyable>{user.id}</Text>
                    </DescriptionsItems>
                    <DescriptionsItems label="Роль">
                        <Flex gap={8} align="center">
                            <Tag color={roleColors[user.role]}>{user.role}</Tag>
                            {user.role === 'ADMIN' && (
                                <Text type="secondary">(Администратор)</Text>
                            )}
                        </Flex>
                    </DescriptionsItems>
                    <DescriptionsItems label="Статус">
                        <Tag color="success">Активен</Tag>
                    </DescriptionsItems>
                    {user.phone && (
                        <DescriptionsItems label="Телефон">
                            <Text>{user.phone}</Text>
                        </DescriptionsItems>
                    )}
                </Descriptions>

                {user.role === 'ADMIN' && (
                    <div className="mt-6">
                        <Title level={5} className="mb-4">
                            Административные функции
                        </Title>
                        <Flex gap={16}>
                            <Link href={paths.admin}>
                                <Button type="primary">
                                    Панель управления
                                </Button>
                            </Link>
                        </Flex>
                    </div>
                )}
            </Card>
            <Card title={<Title level={4}>История заказов</Title>}>
                <Table
                    columns={columns}
                    dataSource={orders ?? []}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: 'У вас пока нет заказов' }}
                />
            </Card>
        </div>
    );
};
