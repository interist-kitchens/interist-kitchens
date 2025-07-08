import '@ant-design/v5-patch-for-react-19';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Geologica } from 'next/font/google';

import '../styles';
import { Providers } from '@/app/providers';

const geologica = Geologica({
    subsets: ['cyrillic'],
    display: 'swap',
});

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
        <html lang="ru" className={geologica.className}>
            <body className={`antialiased`}>
                <Providers>{children}</Providers>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
