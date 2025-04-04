import type { PropsWithChildren, FC } from 'react';
import { Text } from '@/shared/ui/Typography';

export const SecondaryText: FC<PropsWithChildren> = ({ children }) => (
    <Text className="!text-[26px] !text-white !font-[400]">{children}</Text>
);
