import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { productCreateAdminModel } from '@/entities/products/model';
import { ProductCreateAdminPage } from '@/page-content/products/ui';
import { getCategories } from '@/entities/categories';
import { getProducts } from '@/entities/products';

const preload = async () => {
    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts(),
    ]);

    return { categories, products };
};

export default async function Page() {
    const scope = fork();

    const { categories, products } = await preload();

    await allSettled(productCreateAdminModel.productCreateAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <ProductCreateAdminPage
                categories={categories}
                products={products}
            />
        </EffectorNext>
    );
}
