import { NextPage } from 'next';
import { EditCategoryForm } from '@/features/categories';
import { CategoryAdminLayout } from '@/widgets/layouts';
import { Title } from '@/shared/ui/Typography';
import { Categories } from '@/entities/categories';

type Props = {
    category: Categories | null;
};

export const CategoryEditAdminPage: NextPage<Props> = ({ category }) => {
    return (
        <CategoryAdminLayout
            titleSlot={<Title>Редактирование категории</Title>}
        >
            <EditCategoryForm category={category} />
        </CategoryAdminLayout>
    );
};
