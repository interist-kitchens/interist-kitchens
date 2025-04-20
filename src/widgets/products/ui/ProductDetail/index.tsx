import { Product, ProductCard, ProductSlider } from '@/entities/products';
import { FC } from 'react';
import { SendOrderBtn } from '@/features/leads/sendOrder';
import { getServerSession } from 'next-auth';
import { authOptions, UserSession } from '@/shared/constants/authOptions';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { paths } from '@/shared/routing';

type Props = {
    product: Product;
};

export const ProductDetail: FC<Props> = async ({ product }) => {
    const session: UserSession | null = await getServerSession(authOptions);

    return (
        <div className={'container mx-auto px-6 pt-5 pb-16'}>
            <Breadcrumbs
                breadcrumbs={[
                    { title: <a href={paths.home}>Главная</a> },
                    { title: <a href={paths.catalog}>Каталог</a> },
                    {
                        title: (
                            <a
                                href={`${paths.catalog}/${product.categories.alias}`}
                            >
                                {product.categories.name}
                            </a>
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
                        <SendOrderBtn product={product} user={session?.user} />
                    }
                />
            </div>
        </div>
    );
};
