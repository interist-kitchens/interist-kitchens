import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { AdminCategoryList, Categories } from '@/entities/categories';
import { Flex } from 'antd';
import Link from 'next/link';
import { paths } from '@/shared/routing';

type Props = {
    categories: Categories[];
};

export const CategoryListAdminPage: NextPage<Props> = async ({
    categories,
}) => {
    return (
        <>
            <Flex align={'center'} justify={'space-between'}>
                <Title>Категории</Title>
                <Link href={paths.categoriesAdminCreate}>Добавить</Link>
            </Flex>
            <AdminCategoryList categories={categories} />
        </>
    );
};
