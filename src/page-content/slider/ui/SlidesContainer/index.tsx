'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUnit } from 'effector-react';
import { modalModel } from '@/shared/ui/ModalManager';
import { Button, Flex, message, Spin, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { slideDeleteModel } from '@/entities/slides/model/slideDeleteAdminModel';
import { SlideItem } from '@/widgets/mainPageSlider';
import type { Slide } from '@/entities/slides';

type Props = {
    slides?: Slide[];
};

export const SlidesContainer = ({ slides }: Props) => {
    const [openModal, closeModal, submit, loading, isSuccess, reset] = useUnit([
        modalModel.openModal,
        modalModel.closeModal,
        slideDeleteModel.submitDelete,
        slideDeleteModel.$pending,
        slideDeleteModel.$isSuccess,
        slideDeleteModel.reset,
    ]);

    const router = useRouter();

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

    return (
        <Spin tip="Обновление данных..." spinning={loading}>
            <Flex gap={24} vertical className="w-[426px]">
                <Button icon={<PlusOutlined />}>Добавить слайд</Button>
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
