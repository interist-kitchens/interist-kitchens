import { MainLayout } from '@/widgets/layouts';
import { Categories } from '@/entities/categories';
import { NextPage } from 'next';
import { CategoryListing } from '@/widgets/categoryListing';

type Props = {
    category: Categories;
};

export const CategoryListPage: NextPage<Props> = ({ category }) => {
    return (
        <MainLayout>
            <CategoryListing category={category} />
        </MainLayout>
    );
};
