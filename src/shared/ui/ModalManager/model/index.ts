import type { ReactNode } from 'react';
import { createEvent, createStore, sample } from 'effector';
import type { ModalType } from '@/shared/constants/modals';
import { atom } from '@/shared/factory/atom';

type ModalState = {
    isOpen: boolean;
    type?: ModalType;
    content?: ReactNode;
    onSubmit?(): void;
    onCancel?(): void;
    okText?: string;
    cancelText?: string;
};

export const modalModel = atom(() => {
    const openModal = createEvent<Omit<ModalState, 'isOpen'>>();
    const closeModal = createEvent();

    const $modalState = createStore<ModalState>({ isOpen: false }).reset(
        closeModal
    );

    sample({
        clock: openModal,
        filter: (payload) => !!payload?.type,
        fn: (payload) => ({
            isOpen: true,
            ...payload,
        }),
        target: $modalState,
    });

    return {
        $modalState,
        openModal,
        closeModal,
    };
});
