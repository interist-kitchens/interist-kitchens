import { MainPageSlider } from '@/widgets/mainPageSlider';
import { MainLayout } from '@/widgets/layouts';
import { Suspense } from 'react';
import { MainProductCarousel } from '@/widgets/mainProductCarousel';
import { WhatIncludedBox } from '@/widgets/whatIncluded';
import { Advantages } from '@/widgets/mainPageAdvantages';
import { ProcessBlock } from '@/widgets/mainPageProcessBlock';
import { PayDeliveryBlock } from '@/widgets/mainPayDelivery';
import { VideoBlock } from '@/widgets/mainVideoBlock';
import { Flex } from 'antd';
import SkeletonNode from 'antd/es/skeleton/Node';

export default async function Home() {
    return (
        <MainLayout>
            <Flex vertical gap={48}>
                <Suspense
                    fallback={
                        <SkeletonNode
                            style={{ height: '540px', width: '100%' }}
                            active
                        />
                    }
                >
                    <MainPageSlider />
                </Suspense>
                <MainProductCarousel />
                <WhatIncludedBox />
                <Advantages />
                <ProcessBlock />
                <PayDeliveryBlock />
                <VideoBlock />
            </Flex>
        </MainLayout>
    );
}
