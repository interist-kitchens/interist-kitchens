'use client';

import { modalModel } from '@/shared/ui/ModalManager';
import { Button } from 'antd';
import { useUnit } from 'effector-react';

export const CallBackButton = () => {
    const [openModal] = useUnit([modalModel.openModal]);

    const handleCallBack = () => {
        openModal({
            type: 'callback',
            onSubmit: () => {
                console.log('Submit form');
            },
        });
    };

    return (
        <Button onClick={handleCallBack} type="primary">
            Заказать звонок
        </Button>
    );
};
