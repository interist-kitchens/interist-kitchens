import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { Categories, CategoryList } from '@/entities/categories';
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
                <Link href={paths.categoriesCreate}>Добавить</Link>
            </Flex>
            <CategoryList categories={categories} />
        </>
    );
};
