'use client';

import { FC } from 'react';
import { Form, Input } from 'antd';
import { DeliveryCartType } from '@/entities/leads/api';
import { useUnit } from 'effector-react';
import { cartModel } from '@/entities/leads/model';

const { Item: FormItem } = Form;

interface FieldData {
    name: string;
    value?: string;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

export const DeliveryForm: FC = () => {
    const [changeField, setIsValid] = useUnit([
        cartModel.changeField,
        cartModel.setIsValid,
    ]);

    const handleChange = (
        changedFields: FieldData[],
        allFields: FieldData[]
    ) => {
        const isValid =
            !changedFields?.[0]?.validating &&
            changedFields?.[0]?.errors?.length === 0;

        if (isValid) {
            changeField({
                key: changedFields?.[0]?.name,
                value: changedFields?.[0]?.value ?? '',
            });
        }

        if (
            allFields.every(
                (field) =>
                    !field.validating &&
                    field.errors?.length === 0 &&
                    field.touched &&
                    field.value !== ''
            )
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    return (
        <Form onFieldsChange={handleChange}>
            <FormItem<DeliveryCartType>
                name={'name'}
                rules={[{ required: true, message: 'Заполните имя' }]}
            >
                <Input placeholder={'Ваше имя'} />
            </FormItem>
            <FormItem<DeliveryCartType>
                rules={[
                    {
                        type: 'email',
                        message: 'E-mail введен не верно',
                    },
                ]}
                name={'email'}
            >
                <Input placeholder={'Ваш e-mail'} />
            </FormItem>
            <FormItem<DeliveryCartType>
                name={'phone'}
                rules={[
                    {
                        required: true,
                        message: 'Заполните телефон',
                    },
                    {
                        min: 10,
                        message: 'Телефон введен не верно',
                    },
                    {
                        max: 10,
                        message: 'Телефон введен не верно',
                    },
                ]}
            >
                <Input
                    addonBefore={'+7'}
                    placeholder={'Телефон'}
                    count={{ max: 10 }}
                />
            </FormItem>
            <FormItem<DeliveryCartType>
                name={'address'}
                rules={[{ required: true, message: 'Заполните адрес' }]}
            >
                <Input placeholder={'Адрес доставки'} />
            </FormItem>
        </Form>
    );
};
