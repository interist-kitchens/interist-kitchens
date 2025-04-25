import { Flex } from 'antd';
import { Text } from '@/shared/ui/Typography';
import { MainText } from './MainText';

type Props = {
    text: string;
    description?: string | null;
    previewMode?: boolean;
};
export const Informer = ({ text, description, previewMode }: Props) => (
    <Flex
        vertical
        gap={previewMode ? 4 : 10}
        className={`bg-[var(--info-color)] ${previewMode ? '!p-[8px]' : '!p-[24px]'} max-w-fit`}
    >
        <MainText previewMode={previewMode}>{text}</MainText>
        {description && (
            <Text
                className={`${previewMode ? '!text-[4px] !font-[200]' : '!text-[20px] !font-[400]'} !text-white `}
            >
                {description}
            </Text>
        )}
    </Flex>
);
