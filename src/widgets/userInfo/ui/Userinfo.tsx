'use client';

import { Avatar, Flex, Tooltip } from 'antd';
import { type Session } from 'next-auth';
import { LogoutButton } from '@/features/session/logout';
import { UserOutlined } from '@ant-design/icons';
import { LoginButton } from '@/features/session/login/ui/LoginButton';
import Link from 'next/link';
import { paths } from '@/shared/routing';

type Props = {
    session: Session | null;
};

export const UserInfo = ({ session }: Props) =>
    session ? (
        <Flex align="center" gap={8}>
            <Tooltip title={session?.user?.name}>
                <Link href={paths.profile}>
                    <Avatar
                        size={32}
                        src={session?.user?.image}
                        icon={!session?.user?.image && <UserOutlined />}
                    />
                </Link>
            </Tooltip>

            <LogoutButton />
        </Flex>
    ) : (
        <LoginButton />
    );
