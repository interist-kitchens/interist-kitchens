'use client';

import { FC } from 'react';
import { Button, Form, Select, Space, Typography } from 'antd';
import { Product } from '@/entities/products';
import { $Enums } from '@prisma/client';

type Relation = {
    productId: number;
    type: $Enums.ProductRelationType;
};

type Props = {
    productId: number;
    relatedProducts: Relation[];
    allProducts: Product[];
};

export const ProductRelations: FC<Props> = ({
    productId,
    relatedProducts,
    allProducts,
}) => {
    const [form] = Form.useForm();

    const onFinish = (values: {
        productId: number;
        type: $Enums.ProductRelationType;
    }) => {
        // Здесь будет вызов API для добавления связи
        console.log('Добавить связь:', { fromProductId: productId, ...values });
        form.resetFields();
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Title level={5}>Связанные товары</Typography.Title>

            <Form form={form} onFinish={onFinish} layout="inline">
                <Form.Item name="productId" rules={[{ required: true }]}>
                    <Select
                        placeholder="Выберите товар"
                        style={{ width: 200 }}
                        options={allProducts
                            .filter((p) => parseInt(p.id) !== productId)
                            .map((p) => ({ value: p.id, label: p.name }))}
                    />
                </Form.Item>

                <Form.Item name="type" rules={[{ required: true }]}>
                    <Select
                        placeholder="Тип связи"
                        style={{ width: 150 }}
                        options={Object.values($Enums.ProductRelationType).map(
                            (t) => ({
                                value: t,
                                label: t,
                            })
                        )}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>

            {/* Список текущих связей */}
            <div>
                {relatedProducts.map((rel) => (
                    <div key={`${rel.productId}-${rel.type}`}>
                        {
                            allProducts.find(
                                (p) => parseInt(p.id) === rel.productId
                            )?.name
                        }{' '}
                        ({rel.type})
                        <Button danger size="small" style={{ marginLeft: 8 }}>
                            Удалить
                        </Button>
                    </div>
                ))}
            </div>
        </Space>
    );
};
