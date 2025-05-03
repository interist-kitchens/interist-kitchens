import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { notFound } from 'next/navigation';
import { categoryListModel } from '@/entities/categories';
import { CategoryListPage } from '@/page-content/categories';

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(categoryListModel.categoryListViewStarted, { scope });

    const categories = scope.getState(categoryListModel.$categories);

    return categories.map((category) => ({
        category: category.alias,
    }));
}

export default async function Page({
    params,
}: {
    params: { category: string };
}) {
    const scope = fork();

    await allSettled(categoryListModel.categoryListPage.open, {
        scope,
        params,
    });

    const values = serialize(scope);

    const category = scope.getState(categoryListModel.$currentCategory);

    if (!category) {
        notFound();
    }

    return (
        <EffectorNext values={values}>
            <CategoryListPage category={category} />
        </EffectorNext>
    );
}
