import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { CategoriesAdminPage } from '@/page-content/categories';
import { categoriesModel, getCategories } from '@/entities/categories';

async function preload() {
    'use server';

    const categories = await getCategories();

    return categories;
}

export default async function Page() {
    const scope = fork();

    const categories = await preload();

    await allSettled(categoriesModel.categoriesAdminPage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CategoriesAdminPage categories={categories} />
        </EffectorNext>
    );
}
