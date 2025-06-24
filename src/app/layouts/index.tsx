import type { Metadata } from 'next';

import '../styles';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
    title: 'Мебель от InterestMebel',
    description: 'Мебель от InterestMebel',
};

export function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
