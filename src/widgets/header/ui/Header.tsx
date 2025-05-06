import { FC } from 'react';
import { Flex } from 'antd';
import { HeaderMenu } from '@/widgets/headerMenu/ui/HeaderMenu';
import { ContactsBlock } from '@/page-content/home/ui/ContactsBlock';
import { UserInfo } from '@/widgets/userInfo/ui/Userinfo';
import { Header as HeaderLayout } from '@/shared/ui/Layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { HeaderLogo } from '@/widgets/headerLogo';

const MAIN_COMPANY_INFO = {
    homeUrl: 'https://interest-kitchen.ru',
    phone: '8 800 511-96-59',
};

export const Header: FC = async () => {
    const session = await getServerSession(authOptions);

    return (
        <HeaderLayout>
            <Flex align={'center'} gap={20}>
                <HeaderLogo />
                <HeaderMenu />
            </Flex>
            <Flex justify={'end'} align={'center'} gap={24}>
                <ContactsBlock phone={MAIN_COMPANY_INFO.phone} />
                <UserInfo session={session} />
                <HeaderMenu burgerMode phone={MAIN_COMPANY_INFO.phone} />
            </Flex>
        </HeaderLayout>
    );
};
