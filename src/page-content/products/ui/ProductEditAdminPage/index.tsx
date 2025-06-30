import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { Product } from '@/entities/products';
import { EditProductForm } from '@/features/products';
import { Categories } from '@/entities/categories';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';
import { Attributes } from '@/entities/attributes';

type Props = {
    product: Product;
    categories?: Categories[];
    products?: Product[];
    attributes?: Attributes[];
};

export const ProductEditAdminPage: NextPage<Props> = ({
    product,
    categories,
    products,
    attributes,
}) => {
    return (
        <ProductAdminLayout titleSlot={<Title>Редактирование товара</Title>}>
            <EditProductForm
                product={product}
                categories={categories}
                products={products}
                attributes={attributes}
            />
        </ProductAdminLayout>
    );
};
