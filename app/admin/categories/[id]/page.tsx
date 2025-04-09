import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { CategoryDetailAdminPage } from '@/page-content/categories';
import { categoryDetailAdminModel } from '@/entities/categories';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Просмотр категории',
    description: 'Просмотр категории',
};

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(categoryDetailAdminModel.categoryViewStarted, { scope });

    const categories = scope.getState(categoryDetailAdminModel.$categories);

    return categories.map((category) => ({ id: `${category.id}` }));
}

export default async function Page({ params }: { params: { id: string } }) {
    const scope = fork();

    await allSettled(categoryDetailAdminModel.categoryDetailAdminPage.open, {
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
            <CategoryDetailAdminPage category={categoryData} />
        </EffectorNext>
    );
}
