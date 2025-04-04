'use client';

import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { UrlObject } from 'url';

type Props = {
    href: string | UrlObject;
};

export const LinkButton: FC<PropsWithChildren<Props>> = ({
    href,
    children,
}) => (
    <Link
        className="flex items-center bg-white size-max font-[500] h-[56px] px-[24px] rounded-[8px] text-[var(--info-color)] hover:text-[var(--info-color-hover)]"
        href={href}
    >
        {children}
    </Link>
);
