'use client';

import { Button, Form, FormProps, Input } from 'antd';
import { FormLayout, sessionModel } from '@/entities/session';
import { useUnit } from 'effector-react';

type FieldType = {
    name: string;
    email: string;
    password: string;
};

export const LoginForm = () => {
    const [pending, start, error, clearErrors] = useUnit([
        sessionModel.$pending,
        sessionModel.submitLogin,
        sessionModel.$error,
        sessionModel.clearErrors,
    ]);

    const handleSubmit: FormProps<FieldType>['onFinish'] = async (
        values: FieldType
    ) => {
        start(values);
    };

    return (
        <FormLayout name={'Вход'} error={error} clearErrors={clearErrors}>
            <Form
                name="registration"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                style={{ maxWidth: 600 }}
                autoComplete={'off'}
            >
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
                    <Button type="primary" htmlType="submit" loading={pending}>
                        Вход
                    </Button>
                </Form.Item>
            </Form>
        </FormLayout>
    );
};
