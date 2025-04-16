import { FC } from 'react';
import { Text } from '@/shared/ui/Typography';
import { Flex } from 'antd';

type Props = {
    name: string;
    value?: string | null;
};

export const TextDecor: FC<Props> = ({ name, value }) => {
    return (
        <Flex gap={2} wrap>
            <Text strong>{name}:</Text> {value ?? '-'}
        </Flex>
    );
};
