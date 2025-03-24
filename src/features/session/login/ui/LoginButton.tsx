'use client';

import { Button } from 'antd';
import { signIn } from 'next-auth/react';

export const LoginButton = () => {
    const handleLogin = async () => {
        await signIn();
    };

    return <Button onClick={handleLogin}>Войти</Button>;
};
