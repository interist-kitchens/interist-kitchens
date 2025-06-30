import { FC } from 'react';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';
import { Title } from '@/shared/ui/Typography';
import { AddProductForm } from '@/features/products';
import { Categories } from '@/entities/categories';
import { Product } from '@/entities/products';
import { Attributes } from '@/entities/attributes';

type Props = {
    categories?: Categories[];
    products?: Product[];
    attributes?: Attributes[];
};

export const ProductCreateAdminPage: FC<Props> = ({
    categories,
    products,
    attributes,
}) => {
    return (
        <ProductAdminLayout titleSlot={<Title>Добавление товара</Title>}>
            <AddProductForm
                categories={categories}
                products={products}
                attributes={attributes}
            />
        </ProductAdminLayout>
    );
};
