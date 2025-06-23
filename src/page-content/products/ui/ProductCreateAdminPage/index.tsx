import { FC } from 'react';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';
import { Title } from '@/shared/ui/Typography';
import { AddProductForm } from '@/features/products';
import { Categories } from '@/entities/categories';
import { Product } from '@/entities/products';

type Props = {
    categories?: Categories[];
    products?: Product[];
};

export const ProductCreateAdminPage: FC<Props> = ({ categories, products }) => {
    return (
        <ProductAdminLayout titleSlot={<Title>Добавление товара</Title>}>
            <AddProductForm categories={categories} products={products} />
        </ProductAdminLayout>
    );
};
