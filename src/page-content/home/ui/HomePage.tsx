import { MainPageSlider } from '@/widgets/mainPageSlider';
import { MainLayout } from '@/widgets/layouts';

export default async function Home() {
    return (
        <MainLayout>
            <MainPageSlider />
        </MainLayout>
    );
}
