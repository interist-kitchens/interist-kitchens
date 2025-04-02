'use client';

import { Logo } from '@/widgets/headerAdmin';
import { Layout } from 'antd';
import { LogoutButton } from '@/features/session/logout';

const { Header: HeaderAntd } = Layout;

export const Header = () => {
    return (
        <HeaderAntd
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Logo />
            <LogoutButton />
        </HeaderAntd>
    );
};
