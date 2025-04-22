import { MainPageSlider } from '@/widgets/mainPageSlider';
import { MainLayout } from '@/widgets/layouts';
import { Suspense } from 'react';
import { MainProductCarousel } from '@/widgets/mainProductCarousel';
import { WhatIncludedBox } from '@/widgets/whatIncluded';
import { Advantages } from '@/widgets/mainPageAdvantages';
import { ProcessBlock } from '@/widgets/mainPageProcessBlock';
import { Flex, Spin } from 'antd';

export default async function Home() {
    return (
        <MainLayout>
            <Flex vertical gap={48}>
                <MainPageSlider />
                <Suspense fallback={<Spin />}>
                    <MainProductCarousel />
                </Suspense>
                <WhatIncludedBox />
                <Advantages />
                <ProcessBlock />
            </Flex>
        </MainLayout>
    );
}
