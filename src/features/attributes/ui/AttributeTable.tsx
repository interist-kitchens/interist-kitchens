'use client';

import { Button, Drawer, Form, Input, Popconfirm, Space, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';
import { Attributes, AttributesResponse } from '@/entities/attributes';
import { FC, useEffect, useState } from 'react';
import { attributesModel } from '../model';
import { useRouter } from 'next/navigation';

const { Item: FormItem } = Form;

type Props = {
    attributes?: AttributesResponse;
};

export const AttributeTable: FC<Props> = ({ attributes }) => {
    const router = useRouter();

    const [createAttribute, deleteAttribute, pending, isSuccess] = useUnit([
        attributesModel.createAttribute,
        attributesModel.deleteAttribute,
        attributesModel.$pending,
        attributesModel.$isSuccess,
    ]);

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const handleAdd = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const onFinish = (values: { name: string }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        createAttribute(formData);
        onClose();
    };

    const handleDelete = (id: string) => {
        deleteAttribute(id);
    };

    useEffect(() => {
        if (isSuccess) {
            router.refresh();
        }
    }, [isSuccess, router]);

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: unknown, record: Attributes) => (
                <Popconfirm
                    title="Удалить атрибут?"
                    onConfirm={() => handleDelete(record.id.toString())}
                    disabled={pending}
                >
                    <Button danger loading={pending}>
                        Удалить
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    onClick={handleAdd}
                    icon={<PlusOutlined />}
                    loading={pending}
                >
                    Добавить атрибут
                </Button>
            </Space>

            <Drawer
                title="Добавить новый атрибут"
                width={500}
                onClose={onClose}
                open={open}
                styles={{
                    body: { paddingBottom: 80 },
                }}
                footer={
                    <Space style={{ float: 'right' }}>
                        <Button onClick={onClose}>Отмена</Button>
                        <Button
                            onClick={() => form.submit()}
                            type="primary"
                            loading={pending}
                        >
                            Сохранить
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <FormItem
                        name="name"
                        label="Название атрибута"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите название',
                            },
                        ]}
                    >
                        <Input placeholder="Например: Цвет, Размер, Материал" />
                    </FormItem>
                </Form>
            </Drawer>

            <Table
                columns={columns}
                dataSource={attributes}
                rowKey="id"
                loading={pending}
            />
        </div>
    );
};
