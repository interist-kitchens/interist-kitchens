import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { ProductPage } from '@/page-content/products/ui/ProductPage';
import { productModel } from '@/entities/products/model/productModel';
import { notFound } from 'next/navigation';

export async function generateMetadata({
    params,
}: {
    params: { category: string; product: string };
}) {
    const scope = fork();

    await allSettled(productModel.productPage.open, { scope, params });

    const product = scope.getState(productModel.$currentProduct);

    return {
        title: product?.metaTitle?.length
            ? product?.metaTitle
            : `${product?.name} под заказ`,
        description: product?.metaDescription?.length
            ? product?.metaDescription
            : `${product?.name} от производителя QКухни`,
    };
}

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(productModel.productViewStarted, { scope });

    const products = scope.getState(productModel.$products);

    return products.map((product) => ({
        category: product.categories.alias,
        product: product.alias,
    }));
}

export default async function Page({
    params,
}: {
    params: { category: string; product: string };
}) {
    const scope = fork();

    await allSettled(productModel.productPage.open, { scope, params });

    const values = serialize(scope);

    const product = scope.getState(productModel.$currentProduct);

    if (!product || params.category !== product.categories.alias) {
        notFound();
    }

    return (
        <EffectorNext values={values}>
            {product && <ProductPage product={product} />}
        </EffectorNext>
    );
}
