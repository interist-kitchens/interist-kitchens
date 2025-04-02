import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { fetcher } from '@/shared/api/requests/fetcher';
import { Categories, CategoryList } from '@/entities/categories';

async function preload() {
    'use server';

    const res = await fetcher<Categories[], void>({ path: '/categories' });

    return res;
}

export const CategoriesPage: NextPage = async () => {
    const data = await preload();

    return (
        <>
            <Title>Категории</Title>
            <CategoryList categories={data} />
        </>
    );
};
