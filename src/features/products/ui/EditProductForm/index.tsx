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
    UploadFile,
    UploadProps,
} from 'antd';
import { normFile, uploadProps } from '@/features/categories/lib';
import { UploadOutlined } from '@ant-design/icons';
import {
    appendFieldsToFormData,
    mockUploadFunc,
    transliterateToSlug,
} from '@/shared/lib';
import { useRouter } from 'next/navigation';
import { useUnit } from 'effector-react/compat';
import { paths } from '@/shared/routing';
import { WysiwygEditor } from '@/shared/ui/WysiwygEditor';
import { FormFieldType, Product } from '@/entities/products';
import { productEditAdminModel } from '@/entities/products/model';
import { Categories } from '@/entities/categories';

const { Item: FormItem } = Form;

type Props = {
    product: Product;
    categories?: Categories[];
};

export const EditProductForm: FC<Props> = ({ product, categories }) => {
    const router = useRouter();

    const [loading, submit, isSuccess, reset] = useUnit([
        productEditAdminModel.$pending,
        productEditAdminModel.submitUpdate,
        productEditAdminModel.$isSuccess,
        productEditAdminModel.resetUpdateForm,
    ]);

    const [textDescription, setTextDescription] = useState<string>(
        product?.text ?? ''
    );
    const [mainImage, setMainImage] = useState<UploadFile[]>([
        {
            uid: product.image,
            name: product.image,
            status: 'done',
            url: product.image,
        },
    ]);
    const [additionalImage, setAdditionalImage] = useState<UploadFile[]>(
        product.images.map((image) => ({
            uid: image,
            name: image,
            status: 'done',
            url: image,
        }))
    );

    const onFinish: FormProps<FormFieldType>['onFinish'] = async (values) => {
        const formData = new FormData();

        const appendedValues = {
            name: values.name,
            metaTitle: values.metaTitle ?? '',
            metaDescription: values.metaDescription ?? '',
            text: textDescription,
            image:
                (values.image?.[0]?.originFileObj
                    ? values.image?.[0]?.originFileObj
                    : values.image?.[0]?.url) ?? '',
            alias: values.alias ?? transliterateToSlug(values.name),
            categoryId: values.categoryId,
            images:
                values?.images
                    ?.map((file) =>
                        file?.originFileObj ? file.originFileObj : file.url
                    )
                    .filter((file) => typeof file !== 'undefined') ?? [],
            price: values.price,
        };

        appendFieldsToFormData(formData, appendedValues);

        if (product?.id) {
            submit({ id: product?.id, formData });
        }
    };

    const onChangeMainImage: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => {
        setMainImage(newFileList);
    };

    const onChangeAdditionalImage: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => {
        setAdditionalImage(newFileList);
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
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem<FormFieldType>
                            label="Название категории"
                            name="name"
                            rules={[
                                { required: true, message: 'Введите название' },
                            ]}
                            className={'w-full'}
                            initialValue={product?.name}
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
                            initialValue={product?.alias}
                        >
                            <Input />
                        </FormItem>

                        <FormItem<FormFieldType>
                            label="Цена"
                            name="price"
                            rules={[
                                { required: true, message: 'Введите цену' },
                            ]}
                            className={'w-full'}
                            initialValue={product?.price}
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
                            initialValue={mainImage}
                        >
                            <Upload
                                name="image"
                                listType="picture"
                                multiple={false}
                                maxCount={1}
                                customRequest={mockUploadFunc}
                                onChange={onChangeMainImage}
                                fileList={mainImage}
                                {...uploadProps}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Загрузить
                                </Button>
                            </Upload>
                        </FormItem>

                        <FormItem<FormFieldType>
                            name="images"
                            label="Доп. картинки"
                            valuePropName="images"
                            getValueFromEvent={normFile}
                            initialValue={additionalImage}
                        >
                            <Upload
                                name="images[]"
                                listType="picture"
                                customRequest={mockUploadFunc}
                                onChange={onChangeAdditionalImage}
                                fileList={additionalImage}
                                {...uploadProps}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Загрузить
                                </Button>
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
                        initialValue={String(product.categoryId)}
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
                        initialValue={product?.metaTitle}
                    >
                        <Input />
                    </FormItem>

                    <FormItem<FormFieldType>
                        label="Meta Description"
                        name="metaDescription"
                        className={'w-full'}
                        initialValue={product?.metaDescription}
                    >
                        <Input />
                    </FormItem>
                </Flex>

                <FormItem<FormFieldType> label="Описание" name="text">
                    <WysiwygEditor
                        initialValue={textDescription}
                        setContent={setTextDescription}
                    />
                </FormItem>

                <FormItem label={null}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Отправить
                    </Button>
                </FormItem>
            </Form>
        </>
    );
};
