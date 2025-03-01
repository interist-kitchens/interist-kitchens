'use client';

import { Button, Flex, Form, Input, message, Typography } from 'antd';
import { sessionModel } from '@/entities/session';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

type FieldType = {
    name: string;
    email: string;
    password: string;
};

export const RegistrationForm = () => {
    const [pending, start, error, clearErrors] = useUnit([
        sessionModel.$pending,
        sessionModel.submitRegistration,
        sessionModel.$error,
        sessionModel.clearErrors,
    ]);

    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (values: FieldType) => {
        start(values);
    };

    useEffect(() => {
        if (error) {
            messageApi.error(error);
            clearErrors();
        }
    }, [error]);

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
                <Typography.Title>Регистрация</Typography.Title>
                <Form
                    name="registration"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    style={{ maxWidth: 600 }}
                    autoComplete={'off'}
                >
                    <Form.Item<FieldType>
                        label="Имя"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите имя!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите почту!',
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите пароль!',
                            },
                            { min: 6, message: 'Минимум 6 символов' },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={pending}
                        >
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    );
};
