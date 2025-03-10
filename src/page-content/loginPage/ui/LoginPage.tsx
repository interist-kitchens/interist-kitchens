import { NextPage } from 'next';
import { LoginForm } from '@/widgets/auth/ui/LoginForm';
import { Flex } from 'antd';

export const LoginPage: NextPage = () => {
    return (
        <Flex
            justify={'center'}
            align={'center'}
            vertical
            style={{ height: '100%', backgroundColor: '#cdddea' }}
        >
            <LoginForm />
        </Flex>
    );
};
