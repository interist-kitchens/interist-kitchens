import { FC } from 'react';
import { CatalogItem, Categories } from '@/entities/categories';
import { Title } from '@/shared/ui/Typography';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { paths } from '@/shared/routing';
import Link from 'next/link';

type Props = {
    categories?: Categories[];
};

export const Catalog: FC<Props> = ({ categories }) => {
    return (
        <div className={'flex flex-col container mx-auto py-10'}>
            <Breadcrumbs
                breadcrumbs={[
                    { title: <Link href={paths.home}>Главная</Link> },
                    { title: 'Каталог' },
                ]}
            />
            <Title level={1} className={'text-center'}>
                Каталог кухонь
            </Title>
            <div className={'flex flex-col gap-y-16'}>
                {categories?.map((category, index) => (
                    <CatalogItem
                        key={category.id}
                        category={category}
                        variant={index % 2 === 0 ? 'normal' : 'reverse'}
                    />
                ))}
            </div>
        </div>
    );
};
