import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { Product, ProductDetail } from '@/entities/products';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';

type Props = {
    product: Product | null;
};

export const ProductDetailAdminPage: NextPage<Props> = ({ product }) => {
    return (
        <ProductAdminLayout
            titleSlot={
                <Flex align={'center'} justify={'space-between'}>
                    <Title>{product?.name}</Title>
                    <Link href={`#`}>Редактировать</Link>
                </Flex>
            }
        >
            <ProductDetail product={product} />
        </ProductAdminLayout>
    );
};
