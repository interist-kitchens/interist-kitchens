'use client';

import { Button, Flex, Form, FormProps, Input, Typography } from 'antd';
import { FormLayout, sessionModel } from '@/entities/session';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { paths } from '@/shared/routing';

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

    const handleSubmit: FormProps<FieldType>['onFinish'] = async (
        values: FieldType
    ) => {
        start(values);
    };

    return (
        <>
            <FormLayout
                name={'Регистрация'}
                error={error}
                clearErrors={clearErrors}
            >
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
                            className={
                                'shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out'
                            }
                        >
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
                <Flex
                    vertical
                    justify={'center'}
                    align={'center'}
                    className={'text-sm'}
                >
                    <Typography>Уже есть аккаунт?</Typography>
                    <Link href={paths.login}>Войти</Link>
                </Flex>
            </FormLayout>
        </>
    );
};
