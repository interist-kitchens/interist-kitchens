'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUnit } from 'effector-react';
import { modalModel } from '@/shared/ui/ModalManager';
import { Button, Flex, message, Spin, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { slideDeleteModel } from '@/entities/slides/model/slideDeleteAdminModel';
import { SlideItem } from '@/widgets/mainPageSlider';
import type { Slide } from '@/entities/slides';
import { AddSlideForm } from '@/features/slides';
import { slideCreateAdminModel } from '@/entities/slides/model/slideCreateAdminModel';

type Props = {
    slides?: Slide[];
};

export const SlidesContainer = ({ slides }: Props) => {
    const [
        openModal,
        closeModal,
        submit,
        loading,
        isSuccess,
        reset,
        createLoading,
        createSubmit,
        createIsSuccess,
        createReset,
    ] = useUnit([
        modalModel.openModal,
        modalModel.closeModal,
        slideDeleteModel.submitDelete,
        slideDeleteModel.$pending,
        slideDeleteModel.$isSuccess,
        slideDeleteModel.reset,
        slideCreateAdminModel.$pending,
        slideCreateAdminModel.submitCreate,
        slideCreateAdminModel.$isSuccess,
        slideCreateAdminModel.reset,
    ]);

    const [addSlideFormOpen, setAddSlideFormOpen] = useState(false);

    const router = useRouter();
    const loadingStatus = loading || createLoading;

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Слайд удален успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.refresh();
                });
        }
    }, [reset, isSuccess, router]);

    useEffect(() => {
        if (createIsSuccess && addSlideFormOpen) {
            setAddSlideFormOpen(false);
        }
    }, [createIsSuccess, addSlideFormOpen]);

    const handleSubmit = (id: number) => () => {
        if (id) {
            submit(`${id}`);
            closeModal();
        }
    };

    const handleCancel = () => {
        closeModal();
    };

    const handleCallBack = (id: number) => () => {
        openModal({
            type: 'deleteSlide',
            content: (
                <div className="flex gap-3 w-full justify-end mt-4">
                    <Button onClick={handleCancel} type="default">
                        Отмена
                    </Button>
                    <Button onClick={handleSubmit(id)} type="primary">
                        Удалить
                    </Button>
                </div>
            ),
            footer: null,
        });
    };

    const toggleSlideOpened = () => {
        setAddSlideFormOpen((prevState) => !prevState);
    };

    return (
        <Spin tip="Обновление данных..." spinning={loadingStatus}>
            <Flex gap={24} vertical className="w-[426px]">
                <Button icon={<PlusOutlined />} onClick={toggleSlideOpened}>
                    Добавить слайд
                </Button>
                {addSlideFormOpen && (
                    <AddSlideForm
                        loading={createLoading}
                        submit={createSubmit}
                        isSuccess={createIsSuccess}
                        reset={createReset}
                    />
                )}
                {slides?.map((slide) => (
                    <Flex className="h-[240px]" key={slide.id} gap={24}>
                        <SlideItem {...slide} previewMode key={slide.id} />
                        <Flex vertical gap={16}>
                            <Tooltip title="Редактировать">
                                <Button
                                    icon={<EditOutlined />}
                                    shape="circle"
                                />
                            </Tooltip>
                            <Tooltip title="Удалить">
                                <Button
                                    icon={<DeleteOutlined />}
                                    shape="circle"
                                    danger
                                    onClick={handleCallBack(slide.id)}
                                />
                            </Tooltip>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Spin>
    );
};
