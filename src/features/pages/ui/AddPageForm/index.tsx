'use client';

import { FC, useEffect, useState } from 'react';
import { Button, Flex, Form, FormProps, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import { WysiwygEditor } from '@/shared/ui/WysiwygEditor';
import { useUnit } from 'effector-react/compat';
import { pageCreateAdminModel } from '@/entities/pages/model/pageCreateAdminModel';
import { createPage } from '@/entities/pages';
import { paths } from '@/shared/routing';
import { transliterateToSlug } from '@/shared/lib';

const { Item: FormItem } = Form;

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    alias: string;
};

export const AddPageForm: FC = () => {
    const router = useRouter();
    const [textDescription, setTextDescription] = useState<string>('');

    const [loading, submit, isSuccess, reset] = useUnit([
        pageCreateAdminModel.$pending,
        pageCreateAdminModel.submitCreate,
        pageCreateAdminModel.$isSuccess,
        createPage.reset,
    ]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        submit({
            ...values,
            alias: values?.alias ?? transliterateToSlug(values.name),
            text: textDescription,
        });
    };

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Страница создана успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.push(paths.pageAdmin);
                });
        }
    }, [reset, isSuccess, router]);

    return (
        <Form
            name={'addPage'}
            layout={'vertical'}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Flex align={'center'} gap={10} justify={'space-between'}>
                <FormItem<FieldType>
                    label="Название страницы"
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
