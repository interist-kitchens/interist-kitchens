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

    const handleSubmit = () => {
        if (modalState?.onSubmit) {
            modalState.onSubmit();
        }
        closeModal();
    };
    const handleCancel = () => {
        if (modalState?.onCancel) {
            modalState.onCancel();
        }
        closeModal();
    };

    return (
        <Modal
            title={modalTitle}
            open={modalState.isOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText={modalState.okText}
            cancelText={modalState.cancelText}
        >
            {modalState?.content}
        </Modal>
    );
};
