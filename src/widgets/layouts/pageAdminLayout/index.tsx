import { FC, PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { paths } from '@/shared/routing';

type Props = {
    titleSlot: ReactNode;
};

export const PageAdminLayout: FC<PropsWithChildren<Props>> = ({
    children,
    titleSlot,
}) => {
    return (
        <>
            <Link href={paths.pageAdmin}>Назад</Link>
            {titleSlot}
            {children}
        </>
    );
};
