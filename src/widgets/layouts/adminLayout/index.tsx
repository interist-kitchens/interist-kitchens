import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Layout } from 'antd';
import { Header } from '@/widgets/headerAdmin';
import { SidebarMenu } from '@/widgets/sidebarAdmin';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { paths } from '@/shared/routing';
import { authOptions } from '@/shared/constants/authOptions';

export const metadata: Metadata = {
    title: 'Admin Panel',
    description: 'Панель администратора',
};

export async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect(paths.login);
    }

    if (session && session?.user?.role !== 'ADMIN') {
        redirect(paths.home);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Layout>
                <SidebarMenu />
                <Layout style={{ padding: '24px' }}>{children}</Layout>
            </Layout>
        </Layout>
    );
}
