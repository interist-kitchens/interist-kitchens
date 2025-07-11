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
import { appendFieldsToFormData } from '@/shared/lib';
import { useRouter } from 'next/navigation';
import { normFile, uploadProps } from '@/features/categories/lib';

const { Item: FormItem } = Form;

type FieldType = {
    title?: string;
    subTitle?: string;
    informerTitle?: string;
    informerDescription?: string;
    buttonText?: string;
    href?: string;
    image?: UploadFile[];
};

type Props = {
    loading: boolean;
    submit: (payload: FormData) => FormData;
    isSuccess: boolean;
    reset: VoidFunction;
};

export const AddSlideForm: FC<Props> = ({
    loading,
    submit,
    isSuccess,
    reset,
}) => {
    const router = useRouter();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const formData = new FormData();

        const appendedValues = {
            title: values.title ?? '',
            subTitle: values.subTitle ?? '',
            informerTitle: values.informerTitle ?? '',
            informerDescription: values.informerDescription ?? '',
            buttonText: values.buttonText ?? '',
            href: values.href ?? '',
            image: values.image?.[0]?.originFileObj ?? '',
            imageName: values.image?.[0]?.name ?? '',
        };

        appendFieldsToFormData(formData, appendedValues);

        submit(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Слайд успешно добавлен',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.refresh();
                });
        }
    }, [reset, isSuccess, router]);

    return (
        <Form
            name={'addSlide'}
            layout={'vertical'}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Flex>
                <FormItem<FieldType>
                    label="Заголовок слайда"
                    name="title"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>
            </Flex>

            <Flex justify={'space-between'}>
                <FormItem
                    name="image"
                    label="Изображение для слайда"
                    valuePropName="image"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: true,
                            message: 'Изображение для слайда обязательно',
                        },
                    ]}
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
                    label="Подзаголовок"
                    name="subTitle"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>

                <FormItem<FieldType>
                    label="Заголовок баннера"
                    name="informerTitle"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>
            </Flex>

            <Flex justify={'space-between'} gap={10}>
                <FormItem<FieldType>
                    label="Описание баннера"
                    name="informerDescription"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>
            </Flex>

            <Flex justify={'space-between'} gap={10}>
                <FormItem<FieldType>
                    label="Текст кнопки"
                    name="buttonText"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>

                <FormItem<FieldType>
                    label="Сслылка кнопки"
                    name="href"
                    className={'w-full'}
                >
                    <Input />
                </FormItem>
            </Flex>

            <FormItem label={null}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Отправить
                </Button>
            </FormItem>
        </Form>
    );
};
