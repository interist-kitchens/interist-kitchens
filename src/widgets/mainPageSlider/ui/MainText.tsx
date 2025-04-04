import type { PropsWithChildren, FC } from 'react';
import { Text } from '@/shared/ui/Typography';

export const MainText: FC<PropsWithChildren> = ({ children }) => (
    <Text className="!text-[64px]/[66px] !text-white !font-[600]">
        {children}
    </Text>
);
