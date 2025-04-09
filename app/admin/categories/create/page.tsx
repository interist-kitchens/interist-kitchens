import { allSettled, fork, serialize } from 'effector';

import { EffectorNext } from '@effector/next';
import { categoryCreateAdminModel } from '@/entities/categories';
import { CategoryCreateAdminPage } from '@/page-content/categories';

export default async function Page() {
    const scope = fork();

    await allSettled(categoryCreateAdminModel.categoryCreateAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CategoryCreateAdminPage />
        </EffectorNext>
    );
}
