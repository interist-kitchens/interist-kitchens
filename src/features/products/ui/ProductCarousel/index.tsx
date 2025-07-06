import { FC } from 'react';
import { getCategories } from '@/entities/categories';
import { Carousel, Tabs, TabsProps } from 'antd';
import { ProductCard } from './ProductCard';
import { paths } from '@/shared/routing';

export const ProductCarousel: FC = async () => {
    const categories = await getCategories();

    const items: TabsProps['items'] = categories
        ?.filter((category) => category?.products?.length)
        ?.map((category) => ({
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

    return <Tabs defaultActiveKey="1" items={items} />;
};
