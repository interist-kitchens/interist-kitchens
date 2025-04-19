'use client';

import { FC } from 'react';
import { Button } from 'antd';
import { useUnit } from 'effector-react';
import { modalModel } from '@/shared/ui/ModalManager';

export const SendOrderBtn: FC = () => {
    const [openModal] = useUnit([modalModel.openModal]);

    const handleOpenModal = () => {
        openModal({
            type: 'productOrder',
            onOk: () => {
                console.log('Submit form');
            },
            content: <div>Callback modal content here...</div>,
        });
    };

    return (
        <Button type={'primary'} size={'large'} onClick={handleOpenModal}>
            <div className={'text-white'}>Отправить заявку</div>
        </Button>
    );
};
