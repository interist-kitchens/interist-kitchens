'use client';

import { paths } from '@/shared/routing';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import mainLogo from '@/app/assets/header-logo.jpg';
import Link from 'next/link';

export const HeaderLogo = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const ImageContent = (
        <Image src={mainLogo} alt="interest-kitchen-logo" priority />
    );

    return isHomePage ? (
        <div className="w-[120px] h-[48px]">{ImageContent}</div>
    ) : (
        <Link href={paths.home} className="w-[120px] h-[48px]">
            {ImageContent}
        </Link>
    );
};
