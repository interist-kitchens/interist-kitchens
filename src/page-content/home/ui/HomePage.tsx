import { MainPageSlider } from '@/widgets/mainPageSlider';
import { MainLayout } from '@/widgets/layouts';
import { WhatIncludedBox } from '@/widgets/whatIncluded';

export default async function Home() {
    return (
        <MainLayout>
            <MainPageSlider />
            <WhatIncludedBox />
        </MainLayout>
    );
}
