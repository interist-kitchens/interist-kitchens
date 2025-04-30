'use client';

import { FC, useEffect, useState } from 'react';
import { Button, Flex, Form, FormProps, Input, message } from 'antd';
import { transliterateToSlug } from '@/shared/lib';
import { useRouter } from 'next/navigation';
import { useUnit } from 'effector-react/compat';
import { paths } from '@/shared/routing';
import { WysiwygEditor } from '@/shared/ui/WysiwygEditor';
import { Page } from '@prisma/client';
import { pageEditAdminModel } from '@/entities/pages';

const { Item: FormItem } = Form;

type Props = {
    page: Page;
};

type FieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    alias: string;
};

export const EditPageForm: FC<Props> = ({ page }) => {
    const router = useRouter();

    const [loading, submit, isSuccess, reset] = useUnit([
        pageEditAdminModel.$pending,
        pageEditAdminModel.submitUpdate,
        pageEditAdminModel.$isSuccess,
        pageEditAdminModel.resetUpdateForm,
    ]);

    const [textDescription, setTextDescription] = useState<string>(
        page?.text ?? ''
    );

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        submit({
            id: page.id,
            data: {
                ...values,
                alias: values.alias ?? transliterateToSlug(values.name),
                text: textDescription,
            },
        });
    };

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Страница обновлена успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.push(paths.pageAdmin);
                });
        }
    }, [isSuccess, reset, router]);

    return (
        <>
            <Form
                name={'pageEdit'}
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
                            initialValue={page?.name}
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
                            initialValue={page?.alias}
                        >
                            <Input />
                        </FormItem>
                    </Flex>
                    <Flex
                        align={'center'}
                        justify={'space-between'}
                        vertical
                        className={'w-1/2'}
                        gap={10}
                    >
                        <FormItem<FieldType>
                            label="Meta Title"
                            name="metaTitle"
                            className={'w-full'}
                            initialValue={page?.metaTitle}
                        >
                            <Input />
                        </FormItem>

                        <FormItem<FieldType>
                            label="Meta Description"
                            name="metaDescription"
                            className={'w-full'}
                            initialValue={page?.metaDescription}
                        >
                            <Input />
                        </FormItem>
                    </Flex>
                </Flex>

                <FormItem<FieldType> label="Описание" name="text">
                    <WysiwygEditor
                        initialValue={page?.text}
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
