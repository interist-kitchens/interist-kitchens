import { FC } from 'react';
import { Button, Col, Flex, Form, FormProps, Input, Row } from 'antd';
import { useUnit } from 'effector-react';
import { productOrderFormModel } from '@/entities/leads/model';
import { Product } from '@/entities/products';
import Image from 'next/image';
import { Text } from '@/shared/ui/Typography';
import { FormType } from '@/entities/leads/api';
import { User } from 'next-auth';

const { Item: FormItem } = Form;

type Props = {
    product: Product;
    user?: User;
};

export const ProductOrderForm: FC<Props> = ({ product, user }) => {
    const [submitForm, loading] = useUnit([
        productOrderFormModel.submitForm,
        productOrderFormModel.$pending,
    ]);

    const onFinish: FormProps<FormType>['onFinish'] = (values) => {
        submitForm({ ...values, product, user });
    };

    return (
        <Flex vertical gap={16}>
            <Flex align={'center'} gap={16}>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                />
                <Text>{product.name}</Text>
            </Flex>
            <Form onFinish={onFinish}>
                <Row>
                    <Col span={24}>
                        <FormItem<FormType>
                            name={'name'}
                            rules={[
                                { required: true, message: 'Заполните имя' },
                            ]}
                            initialValue={user ? user.name : ''}
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
                            initialValue={user ? user.email : ''}
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
        </Flex>
    );
};
