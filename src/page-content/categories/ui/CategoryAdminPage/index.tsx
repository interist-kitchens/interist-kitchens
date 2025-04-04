import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import { Categories, CategoryDetail } from '@/entities/categories';

type Props = {
    category: Categories | null;
};

export const CategoryAdminPage: NextPage<Props> = ({ category }) => {
    return (
        <>
            <Link href={paths.categories}>Назад</Link>
            <Flex align={'center'} justify={'space-between'}>
                <Title>{category?.name}</Title>
                <Link href={'#'}>Редактировать</Link>
            </Flex>
            <CategoryDetail category={category} />
        </>
    );
};
