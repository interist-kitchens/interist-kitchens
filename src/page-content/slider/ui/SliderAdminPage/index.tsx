import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title, Text } from '@/shared/ui/Typography';
import type { Slide } from '@/entities/slides';
import { SlidesContainer } from '../SlidesContainer';

type Props = {
    slides?: Slide[];
};

export const SliderAdminPage: NextPage<Props> = async ({ slides }) => {
    return (
        <Flex className="p-[24px]" vertical gap={24}>
            <Title>Слайдер домашней страницы</Title>
            <Text strong>{`Всего слайдов: ${slides?.length ?? 0}`}</Text>
            <SlidesContainer slides={slides} />
        </Flex>
    );
};
