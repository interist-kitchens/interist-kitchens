import { NextPage } from 'next';
import { CategoryAdminLayout } from '@/widgets/layouts';
import { Title } from '@/shared/ui/Typography';
import { Product } from '@/entities/products';
import { EditProductForm } from '@/features/products';
import { Categories } from '@/entities/categories';

type Props = {
    product: Product;
    categories: Categories[];
};

export const ProductEditAdminPage: NextPage<Props> = ({
    product,
    categories,
}) => {
    return (
        <CategoryAdminLayout titleSlot={<Title>Редактирование товара</Title>}>
            <EditProductForm product={product} categories={categories} />
        </CategoryAdminLayout>
    );
};
