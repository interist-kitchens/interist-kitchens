import { Product } from '@/entities/products';
import { NextPage } from 'next';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';
import { Title } from '@/shared/ui/Typography';
import { BindingProductToModule } from '@/features/products';

type Props = {
    product: Product;
};

export const ProductEditModuleAdminPage: NextPage<Props> = ({ product }) => {
    return (
        <ProductAdminLayout
            titleSlot={<Title>Привязка модулей к картинке</Title>}
        >
            <BindingProductToModule product={product} />
        </ProductAdminLayout>
    );
};
