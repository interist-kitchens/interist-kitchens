'use client';

import { Button, Form, message, Modal, Select, Table, Tag } from 'antd';
import { $Enums } from '@prisma/client';
import { FC, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import {
    relationTypeToColor,
    relationTypeToName,
} from '@/entities/products/lib';
import { Relation } from '@/entities/products';

type Props = {
    relations: Relation[];
    products: Array<{ id: string; name: string }>;
    onChange: (relations: Omit<Relation, 'productName'>[]) => void;
};

export const ProductRelationsEditor: FC<Props> = ({
    relations,
    products,
    onChange,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        null
    );
    const [selectedType, setSelectedType] =
        useState<$Enums.ProductRelationType>(
            $Enums.ProductRelationType.SIMILAR
        );

    const availableProducts = products
        .filter(
            (p) => !relations.some((r) => r.relatedProductId === parseInt(p.id))
        )
        .map((p) => ({ value: parseInt(p.id), label: p.name }));

    const handleAddRelation = () => {
        if (!selectedProductId) {
            message.error('Выберите товар');
            return;
        }

        const product = products.find(
            (p) => parseInt(p.id) === selectedProductId
        );
        if (!product) return;

        onChange([
            ...relations,
            {
                relatedProductId: selectedProductId,
                type: selectedType,
                productName: product.name,
            },
        ]);

        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    const handleRemoveRelation = (index: number) => {
        const newRelations = [...relations];
        newRelations.splice(index, 1);
        onChange(newRelations);
    };

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Связанные товары</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                    disabled={availableProducts.length === 0}
                >
                    Добавить связь
                </Button>
            </div>

            {relations.length > 0 ? (
                <Table
                    dataSource={relations}
                    columns={[
                        {
                            title: 'Товар',
                            dataIndex: 'productName',
                            key: 'productName',
                        },
                        {
                            title: 'Тип связи',
                            dataIndex: 'type',
                            key: 'type',
                            render: (type: $Enums.ProductRelationType) => (
                                <Tag color={relationTypeToColor[type]}>
                                    {relationTypeToName[type]}
                                </Tag>
                            ),
                        },
                        {
                            title: 'Действия',
                            key: 'actions',
                            render: (_, __, index) => (
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleRemoveRelation(index)}
                                />
                            ),
                        },
                    ]}
                    pagination={false}
                    rowKey={(record) =>
                        `${record.relatedProductId}-${record.type}`
                    }
                />
            ) : (
                <p className="text-gray-500">Нет связанных товаров</p>
            )}

            <Modal
                title="Добавить связь с товаром"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAddRelation}
                okButtonProps={{ disabled: !selectedProductId }}
            >
                <Form layout="vertical">
                    <Form.Item label="Товар" required>
                        <Select
                            placeholder="Выберите товар"
                            options={availableProducts}
                            onChange={setSelectedProductId}
                            showSearch
                            optionFilterProp="label"
                        />
                    </Form.Item>
                    <Form.Item label="Тип связи" required>
                        <Select
                            value={selectedType}
                            onChange={setSelectedType}
                            options={Object.entries(relationTypeToName).map(
                                ([value, label]) => ({
                                    value,
                                    label,
                                })
                            )}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
