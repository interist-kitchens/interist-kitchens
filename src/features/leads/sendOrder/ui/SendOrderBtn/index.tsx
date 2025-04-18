'use client';

import { FC } from 'react';
import { Button } from 'antd';
import { useUnit } from 'effector-react';
import { modalModel } from '@/shared/ui/ModalManager';
import { ProductOrderForm } from '@/entities/leads';
import { Product } from '@/entities/products';

type Props = {
    product: Product;
};

export const SendOrderBtn: FC<Props> = ({ product }) => {
    const [openModal] = useUnit([modalModel.openModal]);

    const handleOpenModal = () => {
        openModal({
            type: 'productOrder',
            onSubmit: () => {
                console.log('Submit form');
            },
            okText: 'Отправить',
            cancelText: 'Отменить',
            content: <ProductOrderForm product={product} />,
        });
    };

    return (
        <Button type={'primary'} size={'large'} onClick={handleOpenModal}>
            <div className={'text-white'}>Отправить заявку</div>
        </Button>
    );
};
