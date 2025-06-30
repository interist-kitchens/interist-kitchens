// src/features/products/ui/ProductAttributesEditor/index.tsx
'use client';

import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    message,
    Select,
    Space,
} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Attributes } from '@/entities/attributes';
import { useState } from 'react';

const { Item: FormItem } = Form;

type AttributeValue = {
    attributeId: number;
    value: string;
    isPublic: boolean;
};

type ProductAttributesEditorProps = {
    allAttributes: Attributes[]; // Все возможные атрибуты
    initialValues?: AttributeValue[]; // Текущие значения атрибутов товара
    onChange: (attributes: AttributeValue[]) => void;
};

export const ProductAttributesEditor = ({
    allAttributes,
    initialValues = [],
    onChange,
}: ProductAttributesEditorProps) => {
    const [selectedAttributes, setSelectedAttributes] =
        useState<AttributeValue[]>(initialValues);
    const [newAttributeId, setNewAttributeId] = useState<number | null>(null);

    // Доступные для выбора атрибуты (исключаем уже выбранные)
    const availableAttributes = allAttributes.filter(
        (attr) =>
            !selectedAttributes.some(
                (selected) => selected.attributeId === attr.id
            )
    );

    const handleAttributeChange = (
        attributeId: number,
        field: 'value' | 'isPublic',
        newValue: string | boolean
    ) => {
        const updatedAttributes = selectedAttributes.map((attr) => {
            if (attr.attributeId === attributeId) {
                return { ...attr, [field]: newValue };
            }
            return attr;
        });

        setSelectedAttributes(updatedAttributes);
        onChange(updatedAttributes.filter((attr) => attr.value.trim() !== ''));
    };

    const handleAddAttribute = () => {
        if (!newAttributeId) {
            message.warning('Выберите атрибут для добавления');
            return;
        }

        const attributeToAdd = allAttributes.find(
            (attr) => attr.id === newAttributeId
        );
        if (!attributeToAdd) return;

        const newAttribute: AttributeValue = {
            attributeId: newAttributeId,
            value: '',
            isPublic: true,
        };

        setSelectedAttributes([...selectedAttributes, newAttribute]);
        setNewAttributeId(null);
    };

    const handleRemoveAttribute = (attributeId: number) => {
        const updatedAttributes = selectedAttributes.filter(
            (attr) => attr.attributeId !== attributeId
        );
        setSelectedAttributes(updatedAttributes);
        onChange(updatedAttributes);
    };

    return (
        <Card
            title="Атрибуты товара"
            style={{ marginBottom: 24 }}
            extra={
                availableAttributes.length > 0 && (
                    <Space>
                        <Select
                            placeholder="Выберите атрибут"
                            style={{ width: 200 }}
                            value={newAttributeId}
                            onChange={setNewAttributeId}
                            options={availableAttributes.map((attr) => ({
                                value: attr.id,
                                label: attr.name,
                            }))}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddAttribute}
                        >
                            Добавить
                        </Button>
                    </Space>
                )
            }
        >
            {selectedAttributes.length === 0 ? (
                <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                    Атрибуты не добавлены
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {selectedAttributes.map((attr) => {
                        const attributeInfo = allAttributes.find(
                            (a) => a.id === attr.attributeId
                        );

                        return (
                            <div
                                key={attr.attributeId}
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    alignItems: 'flex-start',
                                    padding: '12px',
                                    border: '1px solid #f0f0f0',
                                    borderRadius: '8px',
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <FormItem
                                        label={attributeInfo?.name || 'Атрибут'}
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Input
                                            value={attr.value}
                                            onChange={(e) =>
                                                handleAttributeChange(
                                                    attr.attributeId,
                                                    'value',
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Введите значение`}
                                        />
                                    </FormItem>
                                </div>

                                <Space>
                                    <Checkbox
                                        checked={attr.isPublic}
                                        onChange={(e) =>
                                            handleAttributeChange(
                                                attr.attributeId,
                                                'isPublic',
                                                e.target.checked
                                            )
                                        }
                                    >
                                        Публичный
                                    </Checkbox>

                                    <Button
                                        danger
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={() =>
                                            handleRemoveAttribute(
                                                attr.attributeId
                                            )
                                        }
                                    />
                                </Space>
                            </div>
                        );
                    })}
                </div>
            )}
        </Card>
    );
};
