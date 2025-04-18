'use client';

import { modalModel } from '@/shared/ui/ModalManager';
import { Button } from 'antd';
import { useUnit } from 'effector-react';

export const CallBackButton = () => {
    const [openModal, closeModal] = useUnit([modalModel.openModal, modalModel.closeModal]);

    const handleSubmit = () => {
        console.log('Submit modal');
        closeModal();
    }

    const handleCallBack = () => {
        openModal({
            type: 'callback',
            onCancel: () => {
                console.log('Cancel modal');
            },
            content: (
                <div>
                    <p>Контент формы обратной связи здесь...</p>
                    <Button onClick={handleSubmit} type="primary" style={{ marginTop: 20}}>
                        Заказать звонок и закрыть окно
                    </Button>
                </div>
            ),
            footer: null,
        });
    };

    return (
        <Button onClick={handleCallBack} type="primary">
            Заказать звонок
        </Button>
    );
};
