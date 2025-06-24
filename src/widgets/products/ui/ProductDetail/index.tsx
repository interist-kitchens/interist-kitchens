import {
    Product,
    ProductCard,
    ProductRelations,
    ProductSlider,
} from '@/entities/products';
import { FC } from 'react';
import { SendOrderBtn } from '@/features/leads/sendOrder';
import { getServerSession } from 'next-auth';
import { authOptions, UserSession } from '@/shared/constants/authOptions';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { paths } from '@/shared/routing';
import { $Enums } from '@prisma/client';

type Props = {
    product: Product;
};

export const ProductDetail: FC<Props> = async ({ product }) => {
    const session: UserSession | null = await getServerSession(authOptions);

    const relationsByType = product.relatedProducts?.reduce(
        (acc, rel) => {
            if (!acc[rel.type]) acc[rel.type] = [];
            acc[rel.type].push(rel);
            return acc;
        },
        {} as Record<$Enums.ProductRelationType, typeof product.relatedProducts>
    );

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
            {relationsByType?.BUNDLE && (
                <ProductRelations
                    relations={relationsByType.BUNDLE}
                    relationType="BUNDLE"
                    title={'Комплект'}
                />
            )}
        </div>
    );
};
