import { Product, ProductCard, ProductSlider } from '@/entities/products';
import { FC } from 'react';

type Props = {
    product: Product;
};

export const ProductDetail: FC<Props> = ({ product }) => {
    return (
        <div className={'container mx-auto px-6'}>
            <div
                className={
                    'flex flex-col lg:flex-row max-h-[644px] pt-5 pb-16 gap-x-8'
                }
            >
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
