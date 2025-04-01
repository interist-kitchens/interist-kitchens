'use client';

import { Avatar, Flex } from 'antd';
import { type Session } from 'next-auth';
import { LogoutButton } from '@/features/session/logout';
import { Text } from '@/shared/ui/Typography';
import { UserOutlined } from '@ant-design/icons';
import { LoginButton } from '@/features/session/login/ui/LoginButton';

type Props = {
    session: Session | null;
};

export const UserInfo = ({ session }: Props) =>
    session ? (
        <Flex align="center" gap={8}>
            <Text>{session?.user?.name}</Text>
            <Avatar size={32} icon={session?.user?.image ?? <UserOutlined />} />
            <LogoutButton />
        </Flex>
    ) : (
        <LoginButton />
    );
