import type { PropsWithChildren, FC } from 'react';
import { Text } from '@/shared/ui/Typography';

type Props = {
    previewMode?: boolean;
};

export const MainText: FC<PropsWithChildren<Props>> = ({
    previewMode,
    children,
}) => {
    const className = `!text-white ${previewMode ? '!text-[18px]/[20px]' : '!text-[64px]/[66px]'} ${previewMode ? '!font-[400]' : '!font-[600]'}`;
    return <Text className={className}>{children}</Text>;
};
