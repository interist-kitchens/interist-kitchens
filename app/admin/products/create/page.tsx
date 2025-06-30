import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { productCreateAdminModel } from '@/entities/products/model';
import { ProductCreateAdminPage } from '@/page-content/products/ui';
import { getCategories } from '@/entities/categories';
import { getProducts } from '@/entities/products';
import { getAttributes } from '@/entities/attributes';

const preload = async () => {
    const [categories, products, attributes] = await Promise.all([
        getCategories(),
        getProducts(),
        getAttributes(),
    ]);

    return { categories, products, attributes };
};

export default async function Page() {
    const scope = fork();

    const { categories, products, attributes } = await preload();

    await allSettled(productCreateAdminModel.productCreateAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <ProductCreateAdminPage
                categories={categories}
                products={products}
                attributes={attributes}
            />
        </EffectorNext>
    );
}
