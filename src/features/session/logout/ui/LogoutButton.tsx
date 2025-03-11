'use client';

import { Button } from 'antd';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut();
    };

    return <Button onClick={handleLogout}>Выйти</Button>;
};
