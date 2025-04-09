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

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    image?: UploadFile;
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
            image: values.image?.originFileObj ?? '',
            imageName: values.image?.name ?? '',
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
                    router.push(paths.categories);
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
                <Form.Item<FieldType>
                    label="Название категории"
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
