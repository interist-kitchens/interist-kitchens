import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { Product, ProductDetail } from '@/entities/products';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';
import { paths } from '@/shared/routing';

type Props = {
    product: Product | null;
};

export const ProductDetailAdminPage: NextPage<Props> = ({ product }) => {
    return (
        <ProductAdminLayout
            titleSlot={
                <Flex align={'center'} justify={'space-between'}>
                    <Title>{product?.name}</Title>
                    <Link href={`${paths.productsAdmin}/${product?.id}/edit`}>
                        Редактировать
                    </Link>
                </Flex>
            }
        >
            <ProductDetail product={product} />
        </ProductAdminLayout>
    );
};
