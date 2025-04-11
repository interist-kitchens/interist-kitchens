import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { productCreateAdminModel } from '@/entities/products/model';
import { ProductCreateAdminPage } from '@/page-content/products/ui';
import { getCategories } from '@/entities/categories';

const preload = async () => {
    const categories = await getCategories();

    return categories;
};

export default async function Page() {
    const scope = fork();

    const categories = await preload();

    await allSettled(productCreateAdminModel.productCreateAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <ProductCreateAdminPage categories={categories} />
        </EffectorNext>
    );
}
