import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { categoriesPage, CategoriesPage } from '@/page-content/categories';

export default async function Page() {
    const scope = fork();

    await allSettled(categoriesPage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CategoriesPage />
        </EffectorNext>
    );
}
