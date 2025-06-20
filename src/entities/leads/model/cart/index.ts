import { createEvent, createStore } from 'effector';
import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';
import { Product } from '@/entities/products';
import { persist } from 'effector-storage/local';

export const cartModel = atom(() => {
    const addToCart = createEvent<{ product: Product; count: number }>();
    const removeFromCart = createEvent<{ product: Product }>();
    const removeFromCartByProduct = createEvent<{ product: Product }>();
    const clearCart = createEvent();

    const $cart = createStore<{ product: Product; count: number }[]>([]).reset(
        clearCart
    );

    $cart.on(addToCart, (state, { product, count }) => {
        const existingItem = state.find(
            (item) => item.product.id === product.id
        );

        if (existingItem) {
            return state.map((item) =>
                item.product.id === product.id
                    ? { ...item, count: item.count + count }
                    : item
            );
        }

        return [...state, { product, count }];
    });

    $cart.on(removeFromCart, (state, { product }) =>
        state.reduce(
            (acc, item) => {
                if (item.product.id === product.id) {
                    if (item.count > 1) {
                        return [...acc, { ...item, count: item.count - 1 }];
                    }
                    return acc;
                }
                return [...acc, item];
            },
            [] as typeof state
        )
    );

    $cart.on(removeFromCartByProduct, (state, { product }) =>
        state.filter((item) => item.product.id !== product.id)
    );

    const $cartCount = $cart.map(
        (cart) => cart?.reduce((acc, item) => acc + item.count, 0) ?? 0
    );

    const $cartTotal = $cart.map(
        (cart) =>
            cart?.reduce(
                (acc, item) =>
                    acc + item.count * parseFloat(item.product.price),
                0
            ) ?? 0
    );

    const $cartItems = $cart.map((cart) => cart);

    const cartPage = declarePage({
        pageType: 'cartPage',
    });

    if (typeof window !== 'undefined') {
        persist({
            store: $cart,
            key: 'cart',
            sync: false,
        });
    }

    return {
        addToCart,
        removeFromCart,
        removeFromCartByProduct,
        clearCart,
        $cart,
        $cartCount,
        $cartItems,
        $cartTotal,
        cartPage,
    };
});
