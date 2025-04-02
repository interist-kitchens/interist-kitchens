import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { CategoryListAdminPage } from '@/page-content/categories';
import { categoryListAdminModel } from '@/entities/categories';
import { prisma } from '@/shared/prisma/prisma-client';
import { mapCategories } from '@/entities/categories/lib';

async function preload() {
    'use server';

    const categories = await prisma.category.findMany();

    return mapCategories(categories);
}

export default async function Page() {
    const scope = fork();

    const categories = await preload();

    await allSettled(categoryListAdminModel.categoriesAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CategoryListAdminPage categories={categories} />
        </EffectorNext>
    );
}
