import { FC } from 'react';
import { Button, Col, Form, FormProps, Input, Row } from 'antd';
import { FormType } from '@/entities/leads/api';
import { useUnit } from 'effector-react';
import { orderProjectFormModel } from '@/entities/leads/model';

const { Item: FormItem } = Form;

export const OrderProjectForm: FC = () => {
    const [submitForm, loading] = useUnit([
        orderProjectFormModel.submitForm,
        orderProjectFormModel.$pending,
    ]);

    const onFinish: FormProps<FormType>['onFinish'] = (values) => {
        submitForm(values);
    };

    return (
        <Form onFinish={onFinish}>
            <Row>
                <Col span={24}>
                    <FormItem<FormType>
                        name={'name'}
                        rules={[{ required: true, message: 'Заполните имя' }]}
                    >
                        <Input placeholder={'Ваше имя'} />
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <FormItem<FormType>
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
                    <FormItem<FormType>
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
