'use client';

import { FC, useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Form,
    FormProps,
    Input,
    message,
    Upload,
    UploadFile,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { appendFieldsToFormData, transliterateToSlug } from '@/shared/lib';
import { useUnit } from 'effector-react/compat';
import {
    categoryCreateAdminModel,
    createCategory,
} from '@/entities/categories';
import { useRouter } from 'next/navigation';
import { normFile, uploadProps } from '@/features/categories/lib';
import { WysiwygEditor } from '@/shared/ui/WysiwygEditor';
import { paths } from '@/shared/routing';

const { Item: FormItem } = Form;

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    image?: UploadFile[];
    alias: string;
};

export const AddCategoryForm: FC = () => {
    const router = useRouter();
    const [textDescription, setTextDescription] = useState<string>('');

    const [loading, submit, isSuccess, reset] = useUnit([
        categoryCreateAdminModel.$pending,
        categoryCreateAdminModel.submitCreate,
        categoryCreateAdminModel.$isSuccess,
        createCategory.reset,
    ]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const formData = new FormData();

        const appendedValues = {
            name: values.name,
            metaTitle: values.metaTitle ?? '',
            metaDescription: values.metaDescription ?? '',
            text: textDescription,
            image: values.image?.[0]?.originFileObj ?? '',
            imageName: values.image?.[0]?.name ?? '',
            alias: values.alias ?? transliterateToSlug(values.name),
        };

        appendFieldsToFormData(formData, appendedValues);

        submit(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Категория создана успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.push(paths.categoriesAdmin);
                });
        }
    }, [reset, isSuccess, router]);

    return (
        <Form
            name={'addCategory'}
            layout={'vertical'}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Flex align={'center'} gap={10} justify={'space-between'}>
                <FormItem<FieldType>
                    label="Название категории"
                    name="name"
                    rules={[{ required: true, message: 'Введите название' }]}
                    className={'w-full'}
                >
                    <Input />
                </FormItem>

                <FormItem<FieldType>
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
                </FormItem>

                <FormItem
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
                </FormItem>
            </Flex>

            <Flex justify={'space-between'} gap={10}>
                <FormItem<FieldType>
                    label="Meta Title"
                    name="metaTitle"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>

                <FormItem<FieldType>
                    label="Meta Description"
                    name="metaDescription"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>
            </Flex>

            <FormItem<FieldType> label="Описание" name="text">
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
