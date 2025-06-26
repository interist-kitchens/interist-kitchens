import type { Metadata } from 'next';
import { allSettled, fork, serialize } from 'effector';
import { notFound } from 'next/navigation';
import { EffectorNext } from '@effector/next';
import { productDetailAdminModel } from '@/entities/products/model/productDetailAdminModel';
import { ProductDetailAdminPage } from '@/page-content/products/ui';

export const metadata: Metadata = {
    title: 'Просмотр товара',
    description: 'Просмотр товара',
};

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(productDetailAdminModel.productViewStarted, { scope });

    const products = scope.getState(productDetailAdminModel.$products);

    return products.map((product) => ({ id: `${product.id}` }));
}

export default async function Page({ params }: { params: { id: string } }) {
    const scope = fork();

    await allSettled(productDetailAdminModel.productDetailAdminPage.open, {
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
            <ProductDetailAdminPage product={product} />
        </EffectorNext>
    );
}
