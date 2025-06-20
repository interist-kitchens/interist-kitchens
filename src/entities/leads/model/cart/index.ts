import { createEvent, createStore } from 'effector';

export const addToCart = createEvent<{ id: number; count: number }>();
export const removeFromCart = createEvent<{ id: number }>();

export const $cart = createStore<{ id: number; count: number }[]>([]);

$cart.on(addToCart, (state, { id, count }) => [
    ...state,
    { id, count: count || 1 },
]);
$cart.on(removeFromCart, (state, { id }) =>
    state.filter((item) => item.id !== id)
);

export const $cartCount = $cart.map(
    (cart) => cart.reduce((acc, item) => acc + item.count, 0) || 0
);

export const $cartTotal = $cart.map(
    (cart) => cart.reduce((acc, item) => acc + item.count, 0) || 0
);

export const $cartIds = $cart.map((cart) => cart.map((item) => item.id));

export const $isCartEmpty = $cart.map((cart) => cart.length === 0);

export const $cartItems = $cart.map((cart) => cart);
