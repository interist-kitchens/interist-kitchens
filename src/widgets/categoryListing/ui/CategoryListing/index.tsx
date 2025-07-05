import { FC } from 'react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { paths } from '@/shared/routing';
import { Categories } from '@/entities/categories';
import { Title } from '@/shared/ui/Typography';
import { ProductListingCard } from '@/entities/products';
import Link from 'next/link';

type Props = {
    category: Categories;
};

export const CategoryListing: FC<Props> = async ({ category }) => {
    return (
        <div className={'container mx-auto px-6 pt-5 pb-16'}>
            <Breadcrumbs
                breadcrumbs={[
                    { title: <Link href={paths.home}>Главная</Link> },
                    { title: <Link href={paths.catalog}>Каталог</Link> },
                    { title: category.name },
                ]}
            />
            <div className={'flex flex-col pt-5'}>
                <Title level={1}>
                    {category.name} от бренда Interest Mebel
                </Title>
                <div>
                    <div className={'grid lg:grid-cols-2 gap-6'}>
                        {category?.products?.map((product) => (
                            <ProductListingCard
                                key={product.id}
                                category={category}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
