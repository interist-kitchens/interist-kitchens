import type { PropsWithChildren, FC } from 'react';
import { Text } from '@/shared/ui/Typography';

type Props = {
    previewMode?: boolean;
};
export const SecondaryText: FC<PropsWithChildren<Props>> = ({
    previewMode,
    children,
}) => {
    const className = `!text-white ${previewMode ? '!text-[12px]' : '!text-[26px]'} ${previewMode ? '!font-[300]' : '!font-[400]'}`;
    return <Text className={className}>{children}</Text>;
};
