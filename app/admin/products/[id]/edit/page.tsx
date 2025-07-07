import { allSettled, fork, serialize } from 'effector';

import { EffectorNext } from '@effector/next';
import { notFound } from 'next/navigation';
import { productDetailAdminModel } from '@/entities/products/model/productDetailAdminModel';
import { ProductEditAdminPage } from '@/page-content/products/ui';
import { getCategories } from '@/entities/categories';
import { getProducts } from '@/entities/products';
import { getAttributes } from '@/entities/attributes';

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(productDetailAdminModel.productViewStarted, { scope });

    const products = scope.getState(productDetailAdminModel.$products);

    return products.map((product) => ({ id: `${product.id}` }));
}

const preload = async () => {
    const [categories, products, attributes] = await Promise.all([
        getCategories(),
        getProducts(),
        getAttributes(),
    ]);

    return { categories, products, attributes };
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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

    const { categories, products, attributes } = await preload();

    return (
        <EffectorNext values={values}>
            {product && (
                <ProductEditAdminPage
                    product={product}
                    categories={categories}
                    products={products}
                    attributes={attributes}
                />
            )}
        </EffectorNext>
    );
}
