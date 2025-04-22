import { MainPageSlider } from '@/widgets/mainPageSlider';
import { MainLayout } from '@/widgets/layouts';
import { Suspense } from 'react';
import { MainProductCarousel } from '@/widgets/mainProductCarousel';
import { WhatIncludedBox } from '@/widgets/whatIncluded';
import { Flex, Spin } from 'antd';
import { ProcessBlock } from '@/widgets/mainPageProcessBlock';

export default async function Home() {
    return (
        <MainLayout>
            <Flex vertical gap={48}>
                <Suspense fallback={<Spin />}>
                    <MainPageSlider />
                </Suspense>
                <Suspense fallback={<Spin />}>
                    <MainProductCarousel />
                </Suspense>
                <WhatIncludedBox />
                <ProcessBlock />
            </Flex>
        </MainLayout>
    );
}
