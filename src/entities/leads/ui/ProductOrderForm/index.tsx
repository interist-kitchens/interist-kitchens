import { FC } from 'react';
import { Col, Flex, Form, FormProps, Input, Row } from 'antd';
import { useUnit } from 'effector-react';
import { productOrderFormModel } from '@/entities/leads/model';
import { Product } from '@/entities/products';
import Image from 'next/image';
import { Text } from '@/shared/ui/Typography';

const { Item: FormItem } = Form;

export type FormType = {
    productId: string;
    name: string;
    mail: string;
    phone: string;
};

type Props = {
    product: Product;
};

export const ProductOrderForm: FC<Props> = ({ product }) => {
    const [submitForm] = useUnit([productOrderFormModel.submitForm]);

    const onFinish: FormProps<FormType>['onFinish'] = (values) => {
        console.log(values);
        submitForm(values);
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
                <FormItem<FormType>
                    name={'productId'}
                    initialValue={product.id}
                    className={'hidden'}
                >
                    <Input />
                </FormItem>
                <Row>
                    <Col span={24}>
                        <FormItem<FormType> name={'name'}>
                            <Input placeholder={'Ваше имя'} />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem<FormType>
                            rules={[{ type: 'email' }]}
                            name={'mail'}
                        >
                            <Input placeholder={'Ваш e-mail'} />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem<FormType> name={'phone'}>
                            <Input addonBefore={'+7'} placeholder={'Телефон'} />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Flex>
    );
};
