import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { getPages, pageListAdminModel } from '@/entities/pages';
import { PageListAdminPanel } from '@/page-content/pages';

async function preload() {
    'use server';

    const pages = await getPages();

    return pages;
}

export default async function Page() {
    const scope = fork();

    const pages = await preload();

    await allSettled(pageListAdminModel.pageListAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <PageListAdminPanel pages={pages} />
        </EffectorNext>
    );
}
