import { FC, PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { paths } from '@/shared/routing';

type Props = {
    titleSlot: ReactNode;
};

export const CategoryAdminLayout: FC<PropsWithChildren<Props>> = ({
    children,
    titleSlot,
}) => {
    return (
        <>
            <Link href={paths.categoriesAdmin}>Назад</Link>
            {titleSlot}
            {children}
        </>
    );
};
