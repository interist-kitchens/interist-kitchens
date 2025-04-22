'use client';

import { FC, useEffect, useState } from 'react';
import { Categories, categoryEditAdminModel } from '@/entities/categories';
import {
    Button,
    Flex,
    Form,
    FormProps,
    Input,
    message,
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
import { FormFieldType } from '@/entities/products';

const { Item: FormItem } = Form;

type Props = {
    category: Categories;
};

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    image?: UploadFile[];
    alias: string;
};

export const EditCategoryForm: FC<Props> = ({ category }) => {
    const router = useRouter();

    const [loading, submit, isSuccess, reset] = useUnit([
        categoryEditAdminModel.$pending,
        categoryEditAdminModel.submitUpdate,
        categoryEditAdminModel.$isSuccess,
        categoryEditAdminModel.resetUpdateForm,
    ]);

    const [textDescription, setTextDescription] = useState<string>(
        category?.text ?? ''
    );
    const [mainImage, setMainImage] = useState<UploadFile[]>(
        category.image
            ? [
                  {
                      uid: category.image,
                      name: category.image,
                      status: 'done',
                      url: category.image,
                  },
              ]
            : []
    );

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
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
        };

        appendFieldsToFormData(formData, appendedValues);

        if (category?.id) {
            submit({ id: category?.id, formData });
        }
    };

    const onChangeMainImage: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => {
        setMainImage(newFileList);
    };

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Категория обновлена успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.push(paths.categoriesAdmin);
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
                        <FormItem<FieldType>
                            label="Название категории"
                            name="name"
                            rules={[
                                { required: true, message: 'Введите название' },
                            ]}
                            className={'w-full'}
                            initialValue={category?.name}
                        >
                            <Input />
                        </FormItem>

                        <FormItem<FieldType>
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
                            initialValue={category?.alias}
                        >
                            <Input />
                        </FormItem>
                    </Flex>

                    <Flex vertical>
                        <FormItem<FormFieldType>
                            name="image"
                            label="Картинка"
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
                    </Flex>
                </Flex>

                <Flex justify={'space-between'} gap={10}>
                    <FormItem<FieldType>
                        label="Meta Title"
                        name="metaTitle"
                        className={'w-full'}
                        initialValue={category?.metaTitle}
                    >
                        <Input />
                    </FormItem>

                    <FormItem<FieldType>
                        label="Meta Description"
                        name="metaDescription"
                        className={'w-full'}
                        initialValue={category?.metaDescription}
                    >
                        <Input />
                    </FormItem>
                </Flex>

                <FormItem<FieldType> label="Описание" name="text">
                    <WysiwygEditor
                        initialValue={category?.text}
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
