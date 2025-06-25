import { Product, ProductCard, ProductSlider } from '@/entities/products';
import { FC } from 'react';
import { SendOrderBtn } from '@/features/leads/sendOrder';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { paths } from '@/shared/routing';
import { AddToCartBtn } from '@/features/leads/cart';
import Link from 'next/link';

type Props = {
    product: Product;
};

export const ProductDetail: FC<Props> = async ({ product }) => {
    const session = await getServerSession(authOptions);

    return (
        <div className={'container mx-auto px-6 pt-5 pb-16'}>
            <Breadcrumbs
                breadcrumbs={[
                    { title: <Link href={paths.home}>Главная</Link> },
                    { title: <Link href={paths.catalog}>Каталог</Link> },
                    {
                        title: (
                            <Link
                                href={`${paths.catalog}/${product.categories.alias}`}
                            >
                                {product.categories.name}
                            </Link>
                        ),
                    },
                    { title: product.name },
                ]}
            />
            <div className={'flex flex-col lg:flex-row gap-8 pt-5'}>
                <ProductSlider name={product.name} images={product.images} />
                <ProductCard
                    name={product.name}
                    price={product.price}
                    text={product.text}
                    buttonsSlot={
                        <>
                            <AddToCartBtn product={product} />
                            <SendOrderBtn
                                product={product}
                                user={session?.user}
                            />
                        </>
                    }
                />
            </div>
        </div>
    );
};
