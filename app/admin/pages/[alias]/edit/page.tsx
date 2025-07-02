import { allSettled, fork, serialize } from 'effector';

import { EffectorNext } from '@effector/next';
import { notFound } from 'next/navigation';
import { pageDetailAdminModel } from '@/entities/pages';
import { PageEditAdminPanel } from '@/page-content/pages';

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(pageDetailAdminModel.pageViewStarted, { scope });

    const pages = scope.getState(pageDetailAdminModel.$pages);

    return pages.map((page) => ({ alias: `${page.alias}` }));
}

export default async function Page(props: { params: Promise<{ alias: string }> }) {
    const params = await props.params;
    const scope = fork();

    await allSettled(pageDetailAdminModel.pageEditAdminPage.open, {
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
            <PageEditAdminPanel page={pageData} />
        </EffectorNext>
    );
}
