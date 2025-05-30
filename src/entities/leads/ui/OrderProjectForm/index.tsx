import { FC, useEffect } from 'react';
import { Button, Col, Form, FormProps, Input, Row } from 'antd';
import { OrderProjectFormType } from '@/entities/leads/api';
import { useUnit } from 'effector-react';
import { orderProjectFormModel } from '@/entities/leads/model';

const { Item: FormItem } = Form;

export const OrderProjectForm: FC = () => {
    const [submitForm, loading, isSuccess] = useUnit([
        orderProjectFormModel.submitForm,
        orderProjectFormModel.$pending,
        orderProjectFormModel.$isSuccess,
    ]);

    const [form] = Form.useForm();

    const onFinish: FormProps<OrderProjectFormType>['onFinish'] = (values) => {
        submitForm(values);
    };

    useEffect(() => {
        if (isSuccess) {
            form.resetFields();
        }
    }, [isSuccess, form]);

    return (
        <Form form={form} onFinish={onFinish}>
            <Row>
                <Col span={24}>
                    <FormItem<OrderProjectFormType>
                        name={'name'}
                        rules={[{ required: true, message: 'Заполните имя' }]}
                    >
                        <Input placeholder={'Ваше имя'} />
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <FormItem<OrderProjectFormType>
                        rules={[
                            {
                                type: 'email',
                                message: 'E-mail введен не верно',
                            },
                        ]}
                        name={'mail'}
                    >
                        <Input placeholder={'Ваш e-mail'} />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem<OrderProjectFormType>
                        name={'phone'}
                        rules={[
                            {
                                required: true,
                                message: 'Заполните телефон',
                            },
                            {
                                min: 10,
                                message: 'Телефон введен не верно',
                            },
                            {
                                max: 10,
                                message: 'Телефон введен не верно',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={'+7'}
                            placeholder={'Телефон'}
                            count={{ max: 10 }}
                        />
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Button
                    type={'primary'}
                    htmlType={'submit'}
                    className={'w-full'}
                    size={'large'}
                    loading={loading}
                >
                    Отправить
                </Button>
            </FormItem>
        </Form>
    );
};
