'use client';

import { FC } from 'react';
import { Button } from 'antd';
import { useUnit } from 'effector-react';
import { modalModel } from '@/shared/ui/ModalManager';
import { OrderProjectForm } from '@/entities/leads';

export const SendOrderProjectBtn: FC = () => {
    const [openModal] = useUnit([modalModel.openModal]);

    const handleOpenModal = () => {
        openModal({
            type: 'orderProject',
            content: <OrderProjectForm />,
            footer: null,
        });
    };

    return (
        <Button type={'primary'} size={'large'} onClick={handleOpenModal}>
            <div className={'text-white'}>Заказать проект</div>
        </Button>
    );
};
