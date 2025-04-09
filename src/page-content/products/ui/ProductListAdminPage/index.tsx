import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { Product, ProductList } from '@/entities/products';

type Props = {
    products: Product[];
};

export const ProductListAdminPage: NextPage<Props> = async ({ products }) => {
    return (
        <>
            <Flex align={'center'} justify={'space-between'}>
                <Title>Товары</Title>
                <Link href={'#'}>Добавить</Link>
            </Flex>
            <ProductList products={products} />
        </>
    );
};
