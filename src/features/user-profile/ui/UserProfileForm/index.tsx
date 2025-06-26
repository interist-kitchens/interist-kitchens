'use client';

import {
    Avatar,
    Button,
    Card,
    Form,
    Input,
    message,
    Select,
    Spin,
    Upload,
    UploadFile,
} from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userProfileUpdateModel } from '@/features/user-profile';
import { $Enums } from '@prisma/client';
import { User } from '@/entities/user-profile';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import { UploadChangeParam } from 'antd/es/upload';

const { Option } = Select;

interface FormValues {
    name: string;
    email: string;
    phone?: string;
    role: $Enums.UserRole;
    avatar?: string;
    avatarFile?: File;
}

type Props = {
    user: User;
};

export const UserProfileForm: FC<Props> = ({ user }) => {
    const [form] = Form.useForm();
    const router = useRouter();

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<
        string | undefined | null
    >(user.image);

    const [updateProfile, data, pending] = useUnit([
        userProfileUpdateModel.updateProfile,
        userProfileUpdateModel.$profile,
        userProfileUpdateModel.$pending,
    ]);

    useEffect(() => {
        if (data) {
            message.success('Профиль успешно обновлен');
            router.refresh();
        }
    }, [data, router]);

    const onFinish = (values: FormValues) => {
        const formData = new FormData();

        if (!values.name || values.name.length < 2) {
            return message.error('Имя должно содержать минимум 2 символа');
        }

        if (values.name !== user.name) {
            formData.append('name', values.name);
        }
        if (values.phone !== user.phone) {
            formData.append('phone', values.phone || '');
        }
        if (values.role !== user.role && user.role === 'ADMIN') {
            formData.append('role', values.role);
        }

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        } else if (values.avatar !== user.image) {
            formData.append('avatar', values.avatar || '');
        }

        updateProfile({ userId: user.id, formData });
    };

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Вы можете загрузить только изображения!');
            return Upload.LIST_IGNORE;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Изображение должно быть меньше 5MB!');
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const handleAvatarChange = (info: UploadChangeParam<UploadFile<File>>) => {
        if (info.file.status === 'done') {
            const file = info.file.originFileObj as File;
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    return (
        <section className={'w-full my-6 flex justify-center'}>
            <Card
                title="Редактирование профиля"
                className="container"
                extra={
                    <Link href={paths.profile}>
                        <Button icon={<ArrowLeftOutlined />}>
                            Назад к профилю
                        </Button>
                    </Link>
                }
            >
                <Spin spinning={pending}>
                    <Form
                        form={form}
                        initialValues={{
                            name: user.name,
                            email: user.email,
                            phone: user.phone || '',
                            role: user.role,
                            avatar: user.image,
                        }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item name="avatar" label="Аватар">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleAvatarChange}
                                customRequest={(file) => {
                                    setTimeout(() => file.onSuccess?.('ok'), 0);
                                }}
                            >
                                {avatarPreview ? (
                                    <Avatar src={avatarPreview} size={96} />
                                ) : (
                                    <Avatar icon={<UserOutlined />} size={96} />
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Имя"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите ваше имя',
                                },
                                {
                                    min: 2,
                                    message:
                                        'Имя должно содержать минимум 2 символа',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Email" name="email">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Телефон"
                            name="phone"
                            rules={[
                                {
                                    pattern: /^\+?[0-9]{10,15}$/,
                                    message:
                                        'Пожалуйста, введите корректный номер телефона',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        {user.role === 'ADMIN' && (
                            <Form.Item
                                label="Роль"
                                name="role"
                                rules={[{ required: true }]}
                            >
                                <Select>
                                    <Option value="USER">Пользователь</Option>
                                    <Option value="ADMIN">Администратор</Option>
                                </Select>
                            </Form.Item>
                        )}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={pending}
                            >
                                Сохранить изменения
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </section>
    );
};
