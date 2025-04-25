import { NextPage } from 'next';
import { Button, Flex, Tooltip } from 'antd';
import { Title, Text } from '@/shared/ui/Typography';
import type { Slide } from '@/entities/slides';
import { SlideItem } from '@/widgets/mainPageSlider/ui/SlideItem';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type Props = {
    slides?: Slide[];
};

export const SliderAdminPage: NextPage<Props> = async ({ slides }) => {
    return (
        <Flex className="p-[24px]" vertical gap={24}>
            <Title>Слайдер домашней страницы</Title>
            <Text
                strong
            >{`Общее количество слайдов: ${slides?.length ?? 0}`}</Text>
            <Flex gap={24} vertical>
                {slides?.map((slide) => (
                    <Flex
                        className="w-[426px] h-[240px]"
                        key={slide.id}
                        gap={24}
                    >
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
                                />
                            </Tooltip>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};
