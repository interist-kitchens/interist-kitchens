import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { Carousel, Tabs, TabsProps } from 'antd';

import { ProductCard } from '@/widgets/mainProductCarousel';
import { getCategories } from '@/entities/categories';
import { paths } from '@/shared/routing';
import { LinkButton } from '@/widgets/mainPageSlider/ui/LinkButton';

export const MainProductCarousel: FC = async () => {
    const categories = await getCategories();

    const items: TabsProps['items'] = categories.map((category) => ({
        key: category.id,
        label: category.name,
        children: (
            <Carousel
                slidesToShow={4}
                responsive={[
                    {
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ]}
                draggable
                infinite
                dots={false}
                autoplay
            >
                {category?.products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        href={`${paths.catalog}/${category.alias}/${product.alias}`}
                    />
                ))}
            </Carousel>
        ),
    }));

    return categories ? (
        <div className={'container mx-auto px-6'}>
            <Title className={'text-center'}>Кухни Интерест Китченес</Title>
            <Tabs defaultActiveKey="1" items={items} />
            <div className={'flex justify-center mt-8'}>
                <LinkButton href={paths.catalog}>Смотреть все</LinkButton>
            </div>
        </div>
    ) : null;
};
