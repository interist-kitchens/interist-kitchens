import { FC } from 'react';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';
import { Title } from '@/shared/ui/Typography';
import { AddProductForm } from '@/features/products';
import { Categories } from '@/entities/categories';

type Props = {
    categories: Categories[];
};

export const ProductCreateAdminPage: FC<Props> = ({ categories }) => {
    return (
        <ProductAdminLayout titleSlot={<Title>Добавление товара</Title>}>
            <AddProductForm categories={categories} />
        </ProductAdminLayout>
    );
};
