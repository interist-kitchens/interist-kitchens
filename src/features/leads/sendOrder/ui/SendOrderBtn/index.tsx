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
            content: <ProductOrderForm product={product} />,
            footer: null,
        });
    };

    return (
        <Button type={'primary'} size={'large'} onClick={handleOpenModal}>
            <div className={'text-white'}>Отправить заявку</div>
        </Button>
    );
};
