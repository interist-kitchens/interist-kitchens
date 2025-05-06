'use client';

import { Avatar, Flex, Tooltip } from 'antd';
import { type Session } from 'next-auth';
import { LogoutButton } from '@/features/session/logout';
import { UserOutlined } from '@ant-design/icons';
import { LoginButton } from '@/features/session/login/ui/LoginButton';

type Props = {
    session: Session | null;
};

export const UserInfo = ({ session }: Props) =>
    session ? (
        <Flex align="center" gap={8}>
            <Tooltip title={session?.user?.name}>
                <Avatar
                    size={32}
                    icon={session?.user?.image ?? <UserOutlined />}
                />
            </Tooltip>

            <LogoutButton />
        </Flex>
    ) : (
        <LoginButton />
    );
