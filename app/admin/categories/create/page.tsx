import { allSettled, fork, serialize } from 'effector';
import { categoriesAdminCreatePage } from '@/page-content/categories';
import { EffectorNext } from '@effector/next';
import { CategoriesAdminCreatePage } from '@/page-content/categories/ui/CategoriesAdminCreatePage';

export default async function Page() {
    const scope = fork();

    await allSettled(categoriesAdminCreatePage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CategoriesAdminCreatePage />
        </EffectorNext>
    );
}
