import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import {
    CategoriesAdminPage,
    categoriesAdminPage,
} from '@/page-content/categories';

export default async function Page() {
    const scope = fork();

    await allSettled(categoriesAdminPage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CategoriesAdminPage />
        </EffectorNext>
    );
}
