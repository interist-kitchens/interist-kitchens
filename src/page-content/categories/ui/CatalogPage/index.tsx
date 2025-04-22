import { FC } from 'react';
import { Categories } from '@/entities/categories';
import { MainLayout } from '@/widgets/layouts';
import { Catalog } from '@/widgets/categories';

type Props = {
    categories: Categories[];
};

export const CatalogPage: FC<Props> = ({ categories }) => {
    return (
        <MainLayout>
            <Catalog categories={categories} />
        </MainLayout>
    );
};
