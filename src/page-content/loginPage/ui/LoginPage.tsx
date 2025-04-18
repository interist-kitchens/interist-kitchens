'use client';

import { NextPage } from 'next';
import { LoginForm } from '@/widgets/auth/ui/LoginForm';
import { Flex } from 'antd';
import { withSessionProvider } from '@/shared/HOC';

export const LoginPage: NextPage = withSessionProvider(() => {
    return (
        <Flex
            justify={'center'}
            align={'center'}
            vertical
            style={{ height: '100%' }}
        >
            <LoginForm />
        </Flex>
    );
});
