'use client';

import {
    Avatar,
    Button,
    Card,
    Descriptions,
    Flex,
    Tag,
    Typography,
} from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Title } from '@/shared/ui/Typography';
import { FC } from 'react';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import { User } from '@/entities/user-profile';

const { Text } = Typography;
const { Item: DescriptionsItems } = Descriptions;

const roleColors = {
    ADMIN: 'red',
    USER: 'blue',
};

type Props = {
    user: User;
};

export const UserProfile: FC<Props> = ({ user }) => {
    return (
        <Card
            title={
                <Flex align="center" gap={16}>
                    <Title level={4} style={{ margin: 0 }}>
                        Профиль пользователя
                    </Title>
                    <Tag color={roleColors[user.role]} style={{ fontSize: 12 }}>
                        {user.role}
                    </Tag>
                </Flex>
            }
            extra={
                <Link href={paths.profileEdit}>
                    <Button icon={<EditOutlined />}>Редактировать</Button>
                </Link>
            }
            style={{ maxWidth: 800, margin: '24px auto' }}
        >
            <Flex align="center" gap={24} style={{ marginBottom: 32 }}>
                <Avatar
                    size={96}
                    src={user.image}
                    icon={!user.image && <UserOutlined />}
                    style={{ backgroundColor: '#f0f2f5' }}
                />
                <Flex vertical>
                    <Title level={3} style={{ margin: 0 }}>
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
                <div style={{ marginTop: 24 }}>
                    <Title level={5} style={{ marginBottom: 16 }}>
                        Административные функции
                    </Title>
                    <Flex gap={16}>
                        <Link href={paths.admin}>
                            <Button type="primary">Панель управления</Button>
                        </Link>
                    </Flex>
                </div>
            )}
        </Card>
    );
};
