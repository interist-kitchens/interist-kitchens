'use client';

import { Button, Form, message, Modal, Select, Table, Tag } from 'antd';
import { $Enums } from '@prisma/client';
import { FC, useState } from 'react';
import { getRelationTagColor, getRelationTypeLabel } from '@/features/products';
import { Relation } from '@/entities/products';

const { Item: FormItem } = Form;

type Props = {
    products: { id: string; name: string }[];
    relations: Relation[];
    onChangeRelations: (relations: Relation[]) => void;
};

export const ProductRelations: FC<Props> = ({
    products,
    relations,
    onChangeRelations,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        null
    );
    const [selectedType, setSelectedType] =
        useState<$Enums.ProductRelationType>($Enums.ProductRelationType.BUNDLE);

    const availableProducts = products.filter(
        (p) => !relations.some((r) => r.relatedProductId === parseInt(p.id))
    );

    const handleAddRelation = () => {
        if (!selectedProductId || !selectedType) {
            message.error('Выберите товар и тип связи');
            return;
        }

        const product = products.find(
            (p) => parseInt(p.id) === selectedProductId
        );
        if (!product) return;

        onChangeRelations([
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
        onChangeRelations(relations.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Button
                onClick={() => setIsModalOpen(true)}
                disabled={availableProducts.length === 0}
            >
                Добавить связанный товар
            </Button>

            {relations.length > 0 && (
                <Table
                    className={'mt-4'}
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
                            render: (type) => (
                                <Tag color={getRelationTagColor(type)}>
                                    {getRelationTypeLabel(type)}
                                </Tag>
                            ),
                        },
                        {
                            title: 'Действия',
                            key: 'actions',
                            render: (_, __, index) => (
                                <Button
                                    danger
                                    onClick={() => handleRemoveRelation(index)}
                                >
                                    Удалить
                                </Button>
                            ),
                        },
                    ]}
                    rowKey={(record) =>
                        `${record.relatedProductId}-${record.type}`
                    }
                    pagination={false}
                />
            )}

            <Modal
                title="Добавить связанный товар"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAddRelation}
                okButtonProps={{ disabled: !selectedProductId }}
            >
                <Form layout="vertical">
                    <FormItem label="Товар" required>
                        <Select
                            placeholder="Выберите товар"
                            options={availableProducts.map((p) => ({
                                value: parseInt(p.id),
                                label: p.name,
                            }))}
                            onChange={setSelectedProductId}
                            value={selectedProductId}
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        />
                    </FormItem>
                    <FormItem label="Тип связи" required>
                        <Select
                            placeholder="Выберите тип"
                            value={selectedType}
                            onChange={setSelectedType}
                            options={Object.values(
                                $Enums.ProductRelationType
                            ).map((type) => ({
                                value: type,
                                label: getRelationTypeLabel(type),
                            }))}
                        />
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};
