'use client';

import { Modal } from 'antd';
import { useUnit } from 'effector-react';
import React, { type FC } from 'react';
import { modalModel } from '../model';
import { MODAL_TITLES } from '@/shared/constants/modals';

export const ModalManager: FC = () => {
    const [modalState, closeModal] = useUnit([
        modalModel.$modalState,
        modalModel.closeModal,
    ]);

    const modalTitle = modalState?.type
        ? MODAL_TITLES[modalState?.type]
        : undefined;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (modalState?.onOk) {
            modalState.onOk(e);
        }
        closeModal();
    };
    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (modalState?.onCancel) {
            modalState.onCancel(e);
        }
        closeModal();
    };

    return (
        <Modal
            {...modalState}
            title={modalTitle}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText={modalState.okText}
            cancelText={modalState.cancelText}
            destroyOnClose
        >
            {modalState?.content}
        </Modal>
    );
};
