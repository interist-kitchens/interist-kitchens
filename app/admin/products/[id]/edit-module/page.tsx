import { ProductEditModuleAdminPage } from '@/page-content/products/ui';
import { allSettled, fork, serialize } from 'effector';
import { productDetailAdminModel } from '@/entities/products/model';
import { notFound } from 'next/navigation';
import { EffectorNext } from '@effector/next';

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(productDetailAdminModel.productViewStarted, { scope });

    const products = scope.getState(productDetailAdminModel.$products);

    return products.map((product) => ({ id: `${product.id}` }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const scope = fork();

    await allSettled(productDetailAdminModel.productEditModuleAdminPage.open, {
        scope,
        params,
    });

    const values = serialize(scope);

    const product = scope.getState(productDetailAdminModel.$currentProduct);

    if (!product) {
        notFound();
    }

    return (
        <EffectorNext values={values}>
            <ProductEditModuleAdminPage product={product} />
        </EffectorNext>
    );
}
