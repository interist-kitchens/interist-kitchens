import { allSettled, fork, serialize } from 'effector';

import { EffectorNext } from '@effector/next';
import { categoryDetailAdminModel } from '@/entities/categories';
import { CategoryEditAdminPage } from '@/page-content/categories/ui/CategoryEditAdminPage';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(categoryDetailAdminModel.categoryViewStarted, { scope });

    const categories = scope.getState(categoryDetailAdminModel.$categories);

    return categories.map((category) => ({ id: `${category.id}` }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const scope = fork();

    await allSettled(categoryDetailAdminModel.categoryEditAdminPage.open, {
        scope,
        params,
    });

    const values = serialize(scope);

    const categoryData = scope.getState(
        categoryDetailAdminModel.$currentCategory
    );

    if (!categoryData) {
        notFound();
    }

    return (
        <EffectorNext values={values}>
            {categoryData && <CategoryEditAdminPage category={categoryData} />}
        </EffectorNext>
    );
}
