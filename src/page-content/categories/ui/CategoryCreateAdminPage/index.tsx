import { NextPage } from 'next';
import { AddCategoryForm } from '@/features/categories';
import { CategoryAdminLayout } from '@/widgets/layouts';
import { Title } from '@/shared/ui/Typography';

export const CategoryCreateAdminPage: NextPage = async () => {
    return (
        <CategoryAdminLayout titleSlot={<Title>Добавление категории</Title>}>
            <AddCategoryForm />
        </CategoryAdminLayout>
    );
};
