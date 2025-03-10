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
                style={{
                    border: '1px solid #ccc',
                    padding: '3rem',
                    borderRadius: 8,
                    backgroundColor: '#fff',
                }}
            >
                <Typography.Title>{name}</Typography.Title>
                {children}
            </Flex>
        </>
    );
};
