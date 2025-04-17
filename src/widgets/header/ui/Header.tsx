import { FC } from 'react';
import { Flex } from 'antd';
import Image from 'next/image';
import mainLogo from '@/app/assets/header-logo.jpg';
import { HeaderMenu } from '@/widgets/headerMenu/ui/HeaderMenu';
import { ContactsBlock } from '@/page-content/home/ui/ContactsBlock';
import { UserInfo } from '@/widgets/userInfo/ui/Userinfo';
import { Header as HeaderLayout } from '@/shared/ui/Layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import Link from 'next/link';
import { paths } from '@/shared/routing';

const MAIN_COMPANY_INFO = {
    homeUrl: 'https://interest-kitchen.ru',
    phone: '8 800 511-96-59',
};

export const Header: FC = async () => {
    const session = await getServerSession(authOptions);

    return (
        <HeaderLayout>
            <Flex align={'center'} gap={32}>
                <Link href={paths.home} className="w-[120px] h-[48px]">
                    <Image
                        src={mainLogo}
                        alt="interest-kitchen-logo"
                        priority
                    />
                </Link>
                <HeaderMenu />
            </Flex>
            <Flex justify={'end'} align={'center'} gap={24}>
                <ContactsBlock
                    homeUrl={MAIN_COMPANY_INFO.homeUrl}
                    phone={MAIN_COMPANY_INFO.phone}
                />
                <UserInfo session={session} />
            </Flex>
        </HeaderLayout>
    );
};
