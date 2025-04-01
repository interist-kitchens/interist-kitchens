import Link from 'next/link';
import { paths } from '@/shared/routing';
import Image from 'next/image';
import LogoImage from '@/app/assets/header-logo.jpg';

export const Logo = () => {
    return (
        <Link href={paths.admin}>
            <Image src={LogoImage} alt={'Interist-kitchens'} priority />
        </Link>
    );
};
