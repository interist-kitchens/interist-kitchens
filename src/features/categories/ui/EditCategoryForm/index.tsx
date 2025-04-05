'use client';

import { FC, useEffect } from 'react';
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
} from 'antd';
import { normFile, uploadProps } from '@/features/categories/lib';
import { UploadOutlined } from '@ant-design/icons';
import { transliterateToSlug } from '@/shared/lib';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUnit } from 'effector-react/compat';
import { paths } from '@/shared/routing';

const { TextArea } = Input;

type Props = {
    category: Categories | null;
};

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    image?: UploadFile;
    alias: string;
};

export const EditCategoryForm: FC<Props> = ({ category }) => {
    const router = useRouter();

    const [loading, submit, isSuccess, isError, reset] = useUnit([
        categoryEditAdminModel.$pending,
        categoryEditAdminModel.submitUpdate,
        categoryEditAdminModel.$isSuccess,
        categoryEditAdminModel.$isError,
        categoryEditAdminModel.resetUpdateForm,
    ]);

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

        if (category?.id) {
            submit({ id: category?.id, formData });
        }
    };

    useEffect(() => {
        if (isError) {
            message
                .open({
                    type: 'error',
                    content: 'Ошибка обновления данных',
                })
                .then(() => {
                    reset();
                });
        }
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Категория обновлена успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.push(paths.categories);
                });
        }
    }, [isError, isSuccess, reset, router]);

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
                            initialValue={category?.name}
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
                            initialValue={category?.alias}
                        >
                            <Input />
                        </Form.Item>
                    </Flex>

                    <Flex vertical>
                        <div className={'w-fit p-4 bg-white rounded-md'}>
                            {category?.image && (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={200}
                                    height={200}
                                    priority
                                />
                            )}
                        </div>
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
                        initialValue={category?.metaTitle}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Meta Description"
                        name="metaDescription"
                        className={'w-full'}
                        initialValue={category?.metaDescription}
                    >
                        <Input />
                    </Form.Item>
                </Flex>

                <Form.Item<FieldType>
                    label="Описание"
                    name="text"
                    initialValue={category?.text}
                >
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
