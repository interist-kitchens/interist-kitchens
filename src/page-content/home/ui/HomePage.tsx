import { Flex } from 'antd';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '@/shared/constants/authOptions';
import { Layout, Header, Content, Footer } from '@/shared/ui/Layout';
import { ContactsBlock } from './ContactsBlock';
import { UserInfo } from '@/widgets/userInfo/ui/Userinfo';
import { HeaderMenu } from '@/widgets/headerMenu/ui/HeaderMenu';

const mainLogoPath = require('@/app/assets/header-logo.jpg');

const MAIN_COMPANY_INFO = {
    homeUrl: 'https://interest-kitchen.ru',
    phone: '8 800 511-96-59',
};

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <Layout>
            <Header>
                <Flex align={'center'} gap={32}>
                    <Image
                        src={mainLogoPath}
                        alt="interest-kitchen-logo"
                        height={48}
                    />
                    <HeaderMenu />
                </Flex>
                <Flex justify={'end'} align={'center'} gap={24}>
                    <ContactsBlock
                        homeUrl={MAIN_COMPANY_INFO.homeUrl}
                        phone={MAIN_COMPANY_INFO.phone}
                    />
                    <UserInfo session={session} />
                </Flex>
            </Header>
            <Content>Content here</Content>
            <Footer>Footer content here</Footer>
        </Layout>
    );
}
