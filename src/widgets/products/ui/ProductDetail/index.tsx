import { Product, ProductCard, ProductSlider } from '@/entities/products';
import { FC } from 'react';

type Props = {
    product: Product;
};

export const ProductDetail: FC<Props> = async ({ product }) => {
    return (
        <div className={'container mx-auto px-6'}>
            <div className={'flex flex-col lg:flex-row pt-5 pb-16 gap-8'}>
                <ProductSlider name={product.name} images={product.images} />
                <ProductCard
                    name={product.name}
                    price={product.price}
                    text={product.text}
                />
            </div>
        </div>
    );
};
