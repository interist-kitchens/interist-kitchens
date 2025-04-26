import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { Product } from '@/entities/products';
import { EditProductForm } from '@/features/products';
import { Categories } from '@/entities/categories';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';

type Props = {
    product: Product;
    categories?: Categories[];
};

export const ProductEditAdminPage: NextPage<Props> = ({
    product,
    categories,
}) => {
    return (
        <ProductAdminLayout titleSlot={<Title>Редактирование товара</Title>}>
            <EditProductForm product={product} categories={categories} />
        </ProductAdminLayout>
    );
};
