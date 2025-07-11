import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { Product, ProductAdminDetail } from '@/entities/products';
import { ProductAdminLayout } from '@/widgets/layouts/productAdminLayout';
import { paths } from '@/shared/routing';

type Props = {
    product: Product;
};

export const ProductDetailAdminPage: NextPage<Props> = ({ product }) => {
    return (
        <ProductAdminLayout
            titleSlot={
                <Flex align={'center'} justify={'space-between'}>
                    <Title>{product?.name}</Title>
                    <Flex vertical gap={3}>
                        <Link
                            href={`${paths.productsAdmin}/${product?.id}/edit`}
                        >
                            Редактировать
                        </Link>
                        <Link
                            href={`${paths.productsAdmin}/${product?.id}/edit-module`}
                        >
                            Привязать модули
                        </Link>
                    </Flex>
                </Flex>
            }
        >
            <ProductAdminDetail product={product} />
        </ProductAdminLayout>
    );
};
