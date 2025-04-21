import { MainPageSlider } from '@/widgets/mainPageSlider';
import { MainLayout } from '@/widgets/layouts';
import { Suspense } from 'react';
import { MainProductCarousel } from '@/widgets/mainProductCarousel';
import { Flex, Spin } from 'antd';

export default async function Home() {
    return (
        <MainLayout>
            <Flex vertical gap={48}>
                <MainPageSlider />
                <Suspense fallback={<Spin />}>
                    <MainProductCarousel />
                </Suspense>
            </Flex>
        </MainLayout>
    );
}
