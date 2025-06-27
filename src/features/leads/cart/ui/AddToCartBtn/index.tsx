'use client';

import { Button } from 'antd';
import { useUnit } from 'effector-react';
import { cartModel } from '@/entities/leads/model';
import { Product } from '@/entities/products';
import { FC, SyntheticEvent } from 'react';
import ClientOnly from '@/shared/ui/ClientOnly';
import { AddRemoveCartBlock } from '@/entities/leads';

type Props = {
    product: Omit<
        Product,
        | 'createdAt'
        | 'updatedAt'
        | 'metaTitle'
        | 'metaDescription'
        | 'categoryId'
        | 'text'
        | 'images'
        | 'coordinates'
    >;
};

export const AddToCartBtn: FC<Props> = ({ product }) => {
    const [add, cart] = useUnit([cartModel.addToCart, cartModel.$cart]);

    const handleAddToCart = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        add({ product, count: 1 });
    };

    return (
        <ClientOnly>
            {cart.some((item) => item.product.id === product.id) ? (
                <AddRemoveCartBlock product={product} />
            ) : (
                <Button type="primary" onClick={handleAddToCart} size={'large'}>
                    Добавить в корзину
                </Button>
            )}
        </ClientOnly>
    );
};
