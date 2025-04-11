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
import { normFile, uploadProps } from '@/features/categories/lib';
import { UploadOutlined } from '@ant-design/icons';
import { appendFieldsToFormData, transliterateToSlug } from '@/shared/lib';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUnit } from 'effector-react/compat';
import { paths } from '@/shared/routing';
import { WysiwygEditor } from '@/shared/ui/WysiwygEditor';
import { Product } from '@/entities/products';
import { productEditAdminModel } from '@/entities/products/model';
import { Categories } from '@/entities/categories';

type Props = {
    product: Product | null;
    categories: Categories[];
};

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    image?: UploadFile;
    alias: string;
    categoryId: string;
};

export const EditProductForm: FC<Props> = ({ product, categories }) => {
    const router = useRouter();
    const [textDescription, setTextDescription] = useState<string>('');

    const [loading, submit, isSuccess, reset] = useUnit([
        productEditAdminModel.$pending,
        productEditAdminModel.submitUpdate,
        productEditAdminModel.$isSuccess,
        productEditAdminModel.resetUpdateForm,
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

        if (product?.id) {
            submit({ id: product?.id, formData });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Товар обновлен успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.push(paths.productsAdmin);
                });
        }
    }, [isSuccess, reset, router]);

    return (
        <>
            <Form
                name={'addCategory'}
                layout={'vertical'}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Flex justify={'space-between'} gap={10}>
                    <Flex
                        align={'center'}
                        justify={'space-between'}
                        vertical
                        className={'w-1/2'}
                    >
                        <Form.Item<FieldType>
                            label="Название категории"
                            name="name"
                            rules={[
                                { required: true, message: 'Введите название' },
                            ]}
                            className={'w-full'}
                            initialValue={product?.name}
                        >
                            <Input />
                        </Form.Item>

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
                            initialValue={{
                                value: product?.categoryId,
                                label: product?.categoryName,
                            }}
                        >
                            <Select
                                options={categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
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
                            initialValue={product?.alias}
                        >
                            <Input />
                        </Form.Item>
                    </Flex>

                    <Flex vertical>
                        {product?.image && (
                            <div className={'w-fit p-4 bg-white rounded-md'}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={200}
                                    height={200}
                                    priority
                                />
                            </div>
                        )}

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
                                <Button icon={<UploadOutlined />}>
                                    Загрузить
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Flex>
                </Flex>

                <Flex justify={'space-between'} gap={10}>
                    <Form.Item<FieldType>
                        label="Meta Title"
                        name="metaTitle"
                        className={'w-full'}
                        initialValue={product?.metaTitle}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Meta Description"
                        name="metaDescription"
                        className={'w-full'}
                        initialValue={product?.metaDescription}
                    >
                        <Input />
                    </Form.Item>
                </Flex>

                <Form.Item<FieldType> label="Описание" name="text">
                    <WysiwygEditor
                        initialValue={product?.text}
                        setContent={setTextDescription}
                    />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
