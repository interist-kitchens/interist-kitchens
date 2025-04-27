import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { paths } from '@/shared/routing';
import { LinkButton } from '@/widgets/mainPageSlider/ui/LinkButton';
import { ProductCarousel } from '@/features/products/ui/ProductCarousel';

export const MainProductCarousel: FC = async () => {
    return (
        <div className={'container mx-auto px-6'}>
            <Title className={'text-center'}>Кухни Интерест Китченес</Title>
            <ProductCarousel />
            <div className={'flex justify-center mt-8'}>
                <LinkButton href={paths.catalog}>Смотреть все</LinkButton>
            </div>
        </div>
    );
};
