import { NextPage } from 'next';

import { Product } from '@/entities/products';
import { ProductDetail } from '@/widgets/products';
import { MainLayout } from '@/widgets/layouts';

type Props = {
    product: Product;
};

export const ProductPage: NextPage<Props> = async ({ product }) => {
    return (
        <MainLayout>
            <ProductDetail product={product} />
        </MainLayout>
    );
};
