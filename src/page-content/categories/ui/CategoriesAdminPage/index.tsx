import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { fetcher } from '@/shared/api/requests/fetcher';
import { Categories, CategoryList } from '@/entities/categories';
import { Flex } from 'antd';
import Link from 'next/link';
import { paths } from '@/shared/routing';

async function preload() {
    'use server';

    const res = await fetcher<Categories[], void>({
        path: '/categories',
    });

    return res;
}

export const CategoriesAdminPage: NextPage = async () => {
    const data = await preload();

    return (
        <>
            <Flex align={'center'} justify={'space-between'}>
                <Title>Категории</Title>
                <Link href={paths.categoriesCreate}>Добавить</Link>
            </Flex>
            <CategoryList categories={data} />
        </>
    );
};
