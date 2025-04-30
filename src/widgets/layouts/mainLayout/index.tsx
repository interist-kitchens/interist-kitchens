import { FC, PropsWithChildren } from 'react';
import { Content, Layout } from '@/shared/ui/Layout';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Layout>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </Layout>
    );
};
