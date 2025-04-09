import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { getProducts } from '@/entities/products';
import { ProductListAdminPage } from '@/page-content/products/ui';
import { productListAdminModel } from '@/entities/products/model';

async function preload() {
    'use server';

    const products = await getProducts();

    return products;
}

export default async function Page() {
    const scope = fork();

    const products = await preload();

    await allSettled(productListAdminModel.productListAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <ProductListAdminPage products={products} />
        </EffectorNext>
    );
}
