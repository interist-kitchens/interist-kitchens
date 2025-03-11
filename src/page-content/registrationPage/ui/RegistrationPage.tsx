import { RegistrationForm } from '@/widgets/auth/ui/RegistrationForm';
import { NextPage } from 'next';
import { Flex } from 'antd';

export const RegistrationPage: NextPage = () => {
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
};
