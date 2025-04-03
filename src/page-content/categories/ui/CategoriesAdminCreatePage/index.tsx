import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { AddCategoryForm } from '@/features/categories';

export const CategoriesAdminCreatePage: NextPage = async () => {
    return (
        <>
            <Title>Добавление категории</Title>
            <AddCategoryForm />
        </>
    );
};
