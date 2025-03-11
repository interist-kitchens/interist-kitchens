import { Flex, message, Typography } from 'antd';
import { FC, PropsWithChildren, useEffect } from 'react';

type Props = {
    name: string;
    error?: string;
    clearErrors: () => void;
};

export const FormLayout: FC<PropsWithChildren<Props>> = ({
    children,
    name,
    error,
    clearErrors,
}) => {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (error) {
            messageApi.error(error);
            clearErrors();
        }
    }, [error, clearErrors, messageApi]);

    return (
        <>
            {contextHolder}
            <Flex
                vertical
                className={
                    'border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2'
                }
            >
                <Typography.Title
                    className={
                        'pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default'
                    }
                >
                    {name}
                </Typography.Title>
                {children}
            </Flex>
        </>
    );
};
