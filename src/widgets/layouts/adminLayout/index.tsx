import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Layout } from 'antd';
import { Header } from '@/widgets/headerAdmin';
import { SidebarMenu } from '@/widgets/sidebarAdmin';

export const metadata: Metadata = {
    title: 'Admin Panel',
    description: 'Панель администратора',
};

export function AdminLayout({ children }: { children: ReactNode }) {
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
