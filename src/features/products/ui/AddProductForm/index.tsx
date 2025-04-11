'use client';

import { FC, useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Form,
    FormProps,
    Input,
    message,
    Select,
    Upload,
    UploadFile,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { appendFieldsToFormData, transliterateToSlug } from '@/shared/lib';
import { useUnit } from 'effector-react/compat';
import { Categories } from '@/entities/categories';
import { useRouter } from 'next/navigation';
import { normFile, uploadProps } from '@/features/categories/lib';
import { WysiwygEditor } from '@/shared/ui/WysiwygEditor';
import { paths } from '@/shared/routing';
import { productCreateAdminModel } from '@/entities/products/model';

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    image?: UploadFile;
    alias: string;
    categoryId: string;
};

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

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const formData = new FormData();

        const appendedValues = {
            name: values.name,
            metaTitle: values.metaTitle ?? '',
            metaDescription: values.metaDescription ?? '',
            text: textDescription,
            image: values.image?.originFileObj ?? '',
            imageName: values.image?.name ?? '',
            alias: values.alias ?? transliterateToSlug(values.name),
            categoryId: values.categoryId,
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
            <Flex align={'center'} gap={10} justify={'space-between'}>
                <Form.Item<FieldType>
                    label="Название товара"
                    name="name"
                    rules={[{ required: true, message: 'Введите название' }]}
                    className={'w-full'}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="URL алиас"
                    name="alias"
                    rules={[
                        {
                            pattern: /^[a-zA-Z0-9-]+$/,
                            message: 'Допустима только латиница и символы -',
                        },
                    ]}
                    className={'w-full'}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Картинка"
                    valuePropName="image"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        name="image"
                        listType="picture"
                        multiple={false}
                        {...uploadProps}
                    >
                        <Button icon={<UploadOutlined />}>Загрузить</Button>
                    </Upload>
                </Form.Item>
            </Flex>

            <Flex justify={'space-between'} gap={10}>
                <Form.Item<FieldType>
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
                </Form.Item>

                <Form.Item<FieldType>
                    label="Meta Title"
                    name="metaTitle"
                    className={'w-full'}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Meta Description"
                    name="metaDescription"
                    className={'w-full'}
                >
                    <Input />
                </Form.Item>
            </Flex>

            <Form.Item<FieldType> label="Описание" name="text">
                <WysiwygEditor setContent={setTextDescription} />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Отправить
                </Button>
            </Form.Item>
        </Form>
    );
};
