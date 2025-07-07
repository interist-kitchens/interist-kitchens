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
    const [passwordForm] = Form.useForm();
    const router = useRouter();

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<
        string | undefined | null
    >(user.image);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [
        updateProfile,
        data,
        pending,
        changePassword,
        passwordChanging,
        successChangedPassword,
    ] = useUnit([
        userProfileUpdateModel.updateProfile,
        userProfileUpdateModel.$profile,
        userProfileUpdateModel.$pending,
        userProfileUpdateModel.changePasswordEvent,
        userProfileUpdateModel.$pendingPasswordChanged,
        userProfileUpdateModel.$isSuccessChangedPassword,
    ]);

    useEffect(() => {
        if (data) {
            message.success('Профиль успешно обновлен');
            router.refresh();
        }
    }, [data, router]);

    useEffect(() => {
        if (successChangedPassword) {
            message.success('Пароль успешно изменен');
            passwordForm.resetFields();
            setShowPasswordForm(false);
        }
    }, [successChangedPassword, passwordForm]);

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

    const handlePasswordChange = (values: {
        oldPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }) => {
        if (values.newPassword !== values.confirmNewPassword) {
            message.error('Новые пароли не совпадают');
            return;
        }

        changePassword({
            userId: user.id,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        });
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
                <Spin spinning={pending || passwordChanging}>
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
                    {/* Секция смены пароля */}
                    <Card
                        type="inner"
                        title="Смена пароля"
                        className="mt-6"
                        extra={
                            <Button
                                onClick={() =>
                                    setShowPasswordForm(!showPasswordForm)
                                }
                            >
                                {showPasswordForm
                                    ? 'Скрыть'
                                    : 'Изменить пароль'}
                            </Button>
                        }
                    >
                        {showPasswordForm && (
                            <Form
                                form={passwordForm}
                                onFinish={handlePasswordChange}
                                layout="vertical"
                            >
                                <Form.Item
                                    label="Текущий пароль"
                                    name="oldPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Введите текущий пароль',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Новый пароль"
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Введите новый пароль',
                                        },
                                        {
                                            min: 6,
                                            message:
                                                'Пароль должен быть не менее 6 символов',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Подтвердите новый пароль"
                                    name="confirmNewPassword"
                                    dependencies={['newPassword']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Подтвердите новый пароль',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        'newPassword'
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        'Пароли не совпадают'
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={passwordChanging}
                                    >
                                        Сменить пароль
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}
                    </Card>
                </Spin>
            </Card>
        </section>
    );
};
