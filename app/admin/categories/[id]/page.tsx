import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { CategoryAdminPage } from '@/page-content/categories';
import { categoryViewModel } from '@/entities/categories';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Просмотр категории',
    description: 'Просмотр категории',
};

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(categoryViewModel.categoryViewStarted, { scope });

    const categories = scope.getState(categoryViewModel.$categories);

    return categories.map((category) => ({ id: `${category.id}` }));
}

export default async function Page({ params }: { params: { id: string } }) {
    const scope = fork();

    await allSettled(categoryViewModel.categoryAdminPage.open, {
        scope,
        params,
    });

    const values = serialize(scope);

    if (!scope.getState(categoryViewModel.$currentCategory)) {
        notFound();
    }

    return (
        <EffectorNext values={values}>
            <CategoryAdminPage
                category={scope.getState(categoryViewModel.$currentCategory)}
            />
        </EffectorNext>
    );
}
