'use client';

import { FC, useEffect } from 'react';
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
import { transliterateToSlug } from '@/shared/lib';
import { useUnit } from 'effector-react/compat';
import {
    categoryCreateAdminModel,
    createCategory,
} from '@/entities/categories';
import { useRouter } from 'next/navigation';
import { normFile, uploadProps } from '@/features/categories/lib';
import { paths } from '@/shared/routing';

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    image?: UploadFile;
    alias: string;
};

const { TextArea } = Input;

const gerErrorType = (errorCode: string) => {
    switch (errorCode) {
        case 'P2002':
            return 'Алиас уже занят. Введите другой';
        default:
            return 'Ошибка запроса на добавление категории. Попробуйте позже.';
    }
};

export const AddCategoryForm: FC = () => {
    const router = useRouter();

    const [loading, submit, isSuccess, isError, errorCode, reset] = useUnit([
        categoryCreateAdminModel.$pending,
        categoryCreateAdminModel.submitCreate,
        categoryCreateAdminModel.$isSuccess,
        categoryCreateAdminModel.$isError,
        categoryCreateAdminModel.$error,
        createCategory.reset,
    ]);

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('metaTitle', values.metaTitle ?? '');
        formData.append('metaDescription', values.metaDescription ?? '');
        formData.append('text', values.text ?? '');
        formData.append('image', values.image?.originFileObj ?? '');
        formData.append('imageName', values.image?.name ?? '');
        formData.append(
            'alias',
            values.alias ?? transliterateToSlug(values.name)
        );

        submit(formData);
    };

    useEffect(() => {
        if (isError) {
            messageApi
                .open({
                    type: 'error',
                    content: gerErrorType(errorCode),
                })
                .then(() => reset());
        }
        if (isSuccess) {
            messageApi
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
    }, [errorCode, isError, messageApi, reset, isSuccess, router]);

    return (
        <>
            {contextHolder}
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
                        rules={[
                            { required: true, message: 'Введите название' },
                        ]}
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
                                message:
                                    'Допустима только латиница и символы -',
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
                    <TextArea />
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
