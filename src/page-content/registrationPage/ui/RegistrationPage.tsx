'use client';

import { RegistrationForm } from '@/widgets/auth/ui/RegistrationForm';
import { NextPage } from 'next';
import { Flex } from 'antd';
import { withSessionProvider } from '@/shared/HOC';

export const RegistrationPage: NextPage = withSessionProvider(() => {
    return (
        <Flex
            justify={'center'}
            align={'center'}
            vertical
            style={{ height: '100%' }}
        >
            <RegistrationForm />
        </Flex>
    );
});
