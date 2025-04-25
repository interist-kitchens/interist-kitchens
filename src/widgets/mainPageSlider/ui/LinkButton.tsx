import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { UrlObject } from 'url';

type Props = {
    href: string | UrlObject;
    previewMode?: boolean;
};

export const LinkButton: FC<PropsWithChildren<Props>> = ({
    href,
    children,
    previewMode,
}) => {
    const className = `flex items-center bg-white size-max ${previewMode ? 'font-[250] h-[18px] px-[4px] rounded-[2px] text-[8px]' : 'font-[500] h-[56px] px-[24px] rounded-[8px]'} text-[var(--info-color)] hover:text-[var(--info-color-hover)]`;
    return (
        <Link className={className} href={href}>
            {children}
        </Link>
    );
};
