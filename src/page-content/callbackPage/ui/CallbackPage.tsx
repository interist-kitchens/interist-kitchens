import { NextPage } from 'next';
import { Flex } from 'antd';

export const CallbackPage: NextPage = () => {
    return (
        <Flex
            justify={'center'}
            align={'center'}
            vertical
            style={{ height: '100%' }}
        >
            Callback page here
        </Flex>
    );
};
