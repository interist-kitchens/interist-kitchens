import { getCategories } from '@/entities/categories';
import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { CatalogPage } from '@/page-content/categories';
import { catalogModel } from '@/entities/categories/model/catalogModel';

async function preload() {
    'use server';

    const categories = await getCategories();

    return categories;
}

export default async function Page() {
    const scope = fork();

    const categories = await preload();

    await allSettled(catalogModel.catalogPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CatalogPage categories={categories} />
        </EffectorNext>
    );
}
