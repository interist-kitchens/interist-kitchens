'use client';

import { FC, useEffect, useState } from 'react';
import {
    Button,
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
import { FormFieldType } from '@/entities/products';

const { Item: FormItem } = Form;

type Props = {
    categories: Categories[];
};

export const AddProductForm: FC<Props> = ({ categories }) => {
    const router = useRouter();
    const [textDescription, setTextDescription] = useState<string>('');

    const [loading, submit, isSuccess, reset] = useUnit([
        productCreateAdminModel.$pending,
        productCreateAdminModel.submitCreate,
        productCreateAdminModel.$isSuccess,
        productCreateAdminModel.reset,
    ]);

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
        };

        appendFieldsToFormData(formData, appendedValues);

        submit(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Товар создан успешно',
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
                        options={categories.map((category) => ({
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

            <FormItem label={null}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Отправить
                </Button>
            </FormItem>
        </Form>
    );
};
