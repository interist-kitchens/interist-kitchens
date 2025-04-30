import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { pageDetailAdminModel } from '@/entities/pages';
import { PageDetailAdminPanel } from '@/page-content/pages';

export const metadata: Metadata = {
    title: 'Просмотр страницы',
    description: 'Просмотр страницы',
};

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(pageDetailAdminModel.pageViewStarted, { scope });

    const pages = scope.getState(pageDetailAdminModel.$pages);

    return pages.map((page) => ({ alias: `${page.alias}` }));
}

export default async function Page({ params }: { params: { alias: string } }) {
    const scope = fork();

    await allSettled(pageDetailAdminModel.pageDetailAdminPage.open, {
        scope,
        params,
    });

    const values = serialize(scope);

    const pageData = scope.getState(pageDetailAdminModel.$currentPage);

    if (!pageData) {
        notFound();
    }

    return (
        <EffectorNext values={values}>
            <PageDetailAdminPanel page={pageData} />
        </EffectorNext>
    );
}
