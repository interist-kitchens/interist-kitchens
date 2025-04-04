import { Flex } from 'antd';
import { Text } from '@/shared/ui/Typography';
import { MainText } from './MainText';

type Props = {
    text: string;
    description?: string;
};
export const Informer = ({ text, description }: Props) => (
    <Flex
        vertical
        gap={10}
        className="bg-[var(--info-color)] !p-[24px] max-w-fit"
    >
        <MainText>{text}</MainText>
        {description && (
            <Text className="!text-[20px] !text-white !font-[400]">
                {description}
            </Text>
        )}
    </Flex>
);
