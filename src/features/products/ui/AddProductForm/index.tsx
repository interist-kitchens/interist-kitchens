'use client';

import { FC, useEffect, useState } from 'react';
import {
    Button,
    Card,
    Checkbox,
    Col,
    Flex,
    Form,
    FormProps,
    Input,
    message,
    Row,
    Select,
    Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
    appendFieldsToFormData,
    mockUploadFunc,
    transliterateToSlug,
} from '@/shared/lib';
import { useUnit } from 'effector-react/compat';
import { Categories } from '@/entities/categories';
import { useRouter } from 'next/navigation';
import { normFile, uploadProps } from '@/features/categories/lib';
import { WysiwygEditor } from '@/shared/ui/WysiwygEditor';
import { paths } from '@/shared/routing';
import { productCreateAdminModel } from '@/entities/products/model';
import { FormFieldType, Product, Relation } from '@/entities/products';
import { ProductRelations } from '@/features/products';
import { Attributes } from '@/entities/attributes';

const { Item: FormItem } = Form;

type AttributeValue = {
    attributeId: number;
    value: string;
    isPublic: boolean;
};

type Props = {
    categories?: Categories[];
    products?: Product[];
    attributes?: Attributes[];
};

export const AddProductForm: FC<Props> = ({
    categories,
    products = [],
    attributes = [],
}) => {
    const router = useRouter();
    const [textDescription, setTextDescription] = useState<string>('');
    const [relationsToAdd, setRelationsToAdd] = useState<Relation[]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<
        AttributeValue[]
    >([]);

    const [loading, submit, isSuccess, reset] = useUnit([
        productCreateAdminModel.$pending,
        productCreateAdminModel.submitCreate,
        productCreateAdminModel.$isSuccess,
        productCreateAdminModel.reset,
    ]);

    const handleAttributeChange = (
        attributeId: number,
        value: string,
        isPublic: boolean
    ) => {
        setSelectedAttributes((prev) => {
            const existingIndex = prev.findIndex(
                (a) => a.attributeId === attributeId
            );

            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = { attributeId, value, isPublic };
                return updated;
            }

            return [...prev, { attributeId, value, isPublic }];
        });
    };

    const onFinish: FormProps<FormFieldType>['onFinish'] = async (values) => {
        const formData = new FormData();

        const appendedValues = {
            name: values.name,
            metaTitle: values.metaTitle ?? '',
            metaDescription: values.metaDescription ?? '',
            text: textDescription,
            image: values.image?.[0]?.originFileObj ?? '',
            alias: values.alias ?? transliterateToSlug(values.name),
            categoryId: values.categoryId,
            images:
                values?.images
                    ?.map((file) => file.originFileObj)
                    .filter((file) => typeof file !== 'undefined') ?? [],
            price: values.price,
            relations: relationsToAdd,
            attributes: selectedAttributes.filter(
                (attr) => attr.value.trim() !== ''
            ),
        };

        appendFieldsToFormData(formData, appendedValues);

        submit(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Товар создан! Связи добавлены',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.push(paths.productsAdmin);
                });
        }
    }, [reset, isSuccess, router]);

    return (
        <Form
            name={'addProduct'}
            layout={'vertical'}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Row gutter={16}>
                <Col span={12}>
                    <FormItem<FormFieldType>
                        label="Название товара"
                        name="name"
                        rules={[
                            { required: true, message: 'Введите название' },
                        ]}
                        className={'w-full'}
                    >
                        <Input />
                    </FormItem>

                    <FormItem<FormFieldType>
                        label="URL алиас"
                        name="alias"
                        rules={[
                            {
                                pattern: /^[a-zA-Z0-9-]+$/,
                                message:
                                    'Допустима только латиница и символы -',
                            },
                        ]}
                        className={'w-full'}
                    >
                        <Input />
                    </FormItem>

                    <FormItem<FormFieldType>
                        label="Цена"
                        name="price"
                        rules={[{ required: true, message: 'Введите цену' }]}
                        className={'w-full'}
                    >
                        <Input />
                    </FormItem>
                </Col>

                <Col span={12}>
                    <FormItem<FormFieldType>
                        name="image"
                        label="Главная картинка"
                        valuePropName="image"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Выберите основную картинку',
                            },
                        ]}
                    >
                        <Upload
                            name="image"
                            listType="picture"
                            maxCount={1}
                            customRequest={mockUploadFunc}
                            {...uploadProps}
                        >
                            <Button icon={<UploadOutlined />}>Загрузить</Button>
                        </Upload>
                    </FormItem>

                    <FormItem<FormFieldType>
                        name="images"
                        label="Доп. картинки"
                        valuePropName="images"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="images[]"
                            listType="picture"
                            customRequest={mockUploadFunc}
                            {...uploadProps}
                        >
                            <Button icon={<UploadOutlined />}>Загрузить</Button>
                        </Upload>
                    </FormItem>
                </Col>
            </Row>

            <Flex justify={'space-between'} gap={10}>
                <FormItem<FormFieldType>
                    label="Выберите категорию"
                    name="categoryId"
                    className={'w-full'}
                    rules={[
                        {
                            required: true,
                            message: 'Выберите одну из категорий',
                        },
                    ]}
                >
                    <Select
                        options={categories?.map((category) => ({
                            value: category.id,
                            label: category.name,
                        }))}
                    />
                </FormItem>

                <FormItem<FormFieldType>
                    label="Meta Title"
                    name="metaTitle"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>

                <FormItem<FormFieldType>
                    label="Meta Description"
                    name="metaDescription"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>
            </Flex>

            <FormItem<FormFieldType> label="Описание" name="text">
                <WysiwygEditor setContent={setTextDescription} />
            </FormItem>

            {attributes.length > 0 && (
                <Card title="Атрибуты товара" style={{ marginBottom: 24 }}>
                    {attributes.map((attribute) => (
                        <div key={attribute.id} style={{ marginBottom: 16 }}>
                            <FormItem
                                label={attribute.name}
                                name={`attribute_${attribute.id}`}
                            >
                                <Input
                                    placeholder={`Введите ${attribute.name.toLowerCase()}`}
                                    onChange={(e) =>
                                        handleAttributeChange(
                                            attribute.id,
                                            e.target.value,
                                            selectedAttributes.find(
                                                (a) =>
                                                    a.attributeId ===
                                                    attribute.id
                                            )?.isPublic ?? true
                                        )
                                    }
                                />
                            </FormItem>
                            <Checkbox
                                checked={
                                    selectedAttributes.find(
                                        (a) => a.attributeId === attribute.id
                                    )?.isPublic ?? true
                                }
                                onChange={(e) =>
                                    handleAttributeChange(
                                        attribute.id,
                                        selectedAttributes.find(
                                            (a) =>
                                                a.attributeId === attribute.id
                                        )?.value || '',
                                        e.target.checked
                                    )
                                }
                            >
                                Показывать на сайте
                            </Checkbox>
                        </div>
                    ))}
                </Card>
            )}

            <FormItem label="Связанные товары">
                <ProductRelations
                    products={products}
                    relations={relationsToAdd}
                    onChangeRelations={setRelationsToAdd}
                />
            </FormItem>

            <FormItem label={null}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Создать товар
                </Button>
            </FormItem>
        </Form>
    );
};
