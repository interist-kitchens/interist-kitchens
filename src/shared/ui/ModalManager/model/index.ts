import type { ReactNode } from 'react';
import { createEvent, createStore, sample } from 'effector';
import type { ModalType } from '@/shared/constants/modals';
import { atom } from '@/shared/factory/atom';
import type { ModalProps } from "antd/es/modal/interface";

type ModalState = ModalProps & {
    type?: ModalType;
    content?: ReactNode;
};

export const modalModel = atom(() => {
    const openModal = createEvent<Omit<ModalState, 'isOpen'>>();
    const closeModal = createEvent();

    const $modalState = createStore<ModalState>({ open: false }).reset(
        closeModal
    );

    sample({
        clock: openModal,
        filter: (payload) => !!payload?.type,
        fn: (payload) => ({
            open: true,
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
