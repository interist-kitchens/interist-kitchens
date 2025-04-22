import { MainPageSlider } from '@/widgets/mainPageSlider';
import { MainLayout } from '@/widgets/layouts';
import { Suspense } from 'react';
import { MainProductCarousel } from '@/widgets/mainProductCarousel';
import { WhatIncludedBox } from '@/widgets/whatIncluded';
import { Advantages } from '@/widgets/mainPageAdvantages';
import { ProcessBlock } from '@/widgets/mainPageProcessBlock';
import { PayDeliveryBlock } from '@/widgets/mainPayDelivery';
import { VideoBlock } from '@/widgets/mainVideoBlock';
import { Flex, Spin } from 'antd';
import { CallbackForm } from '@/widgets/callbackForm';

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
                <PayDeliveryBlock />
                <VideoBlock />
                <CallbackForm />
            </Flex>
        </MainLayout>
    );
}
