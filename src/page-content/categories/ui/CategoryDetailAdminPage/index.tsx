import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import { Categories, CategoryDetail } from '@/entities/categories';
import { CategoryAdminLayout } from '@/widgets/layouts';

type Props = {
    category: Categories | null;
};

export const CategoryDetailAdminPage: NextPage<Props> = ({ category }) => {
    return (
        <CategoryAdminLayout
            titleSlot={
                <Flex align={'center'} justify={'space-between'}>
                    <Title>{category?.name}</Title>
                    <Link
                        href={`${paths.categoriesAdmin}/${category?.id}/edit`}
                    >
                        Редактировать
                    </Link>
                </Flex>
            }
        >
            <CategoryDetail category={category} />
        </CategoryAdminLayout>
    );
};
