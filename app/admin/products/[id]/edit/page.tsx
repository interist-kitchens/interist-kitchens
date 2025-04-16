import { allSettled, fork, serialize } from 'effector';

import { EffectorNext } from '@effector/next';
import { notFound } from 'next/navigation';
import { productDetailAdminModel } from '@/entities/products/model/productDetailAdminModel';
import { ProductEditAdminPage } from '@/page-content/products/ui';
import { getCategories } from '@/entities/categories';

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(productDetailAdminModel.productViewStarted, { scope });

    const products = scope.getState(productDetailAdminModel.$products);

    return products.map((product) => ({ id: `${product.id}` }));
}

const preload = async () => {
    const categories = await getCategories();

    return categories;
};

export default async function Page({ params }: { params: { id: string } }) {
    const scope = fork();

    await allSettled(productDetailAdminModel.productEditAdminPage.open, {
        scope,
        params,
    });

    const values = serialize(scope);

    const product = scope.getState(productDetailAdminModel.$currentProduct);

    if (!product) {
        notFound();
    }

    const categories = await preload();

    return (
        <EffectorNext values={values}>
            {product && (
                <ProductEditAdminPage
                    product={product}
                    categories={categories}
                />
            )}
        </EffectorNext>
    );
}
