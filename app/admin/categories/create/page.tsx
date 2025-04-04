import { allSettled, fork, serialize } from 'effector';

import { EffectorNext } from '@effector/next';
import { CategoriesAdminCreatePage } from '@/page-content/categories/ui/CategoriesAdminCreatePage';
import { createCategoryModel } from '@/entities/categories';

export default async function Page() {
    const scope = fork();

    await allSettled(createCategoryModel.categoriesAdminCreatePage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CategoriesAdminCreatePage />
        </EffectorNext>
    );
}
