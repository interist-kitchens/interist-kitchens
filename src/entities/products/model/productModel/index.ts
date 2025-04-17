import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';
import {
    createEffect,
    createEvent,
    createStore,
    sample,
    split,
} from 'effector';
import { getProductByAlias, getProducts, Product } from '@/entities/products';

export const productModel = atom(() => {
    const productViewStarted = createEvent();
    const singleRequested = createEvent<string>();

    const productLoaded = createEvent<Product>();
    const productNotFound = createEvent<null>();

    const getProductsFx = createEffect(getProducts);
    const getProductFx = createEffect(getProductByAlias);

    const $products = createStore<Product[]>([]);
    const $currentProductAlias = createStore<string | null>(null);
    const $currentProduct = createStore<Product | null>(null);

    $products.on(getProductsFx.doneData, (_, result) => result);

    $currentProductAlias.on(singleRequested, (_, alias) => alias);

    split({
        source: sample({
            clock: singleRequested,
            source: $products,
            fn: (products, alias) =>
                products.find((product) => product.alias === alias) ?? null,
        }),
        match: {
            found: (product: Product | null) => product !== null,
        },
        cases: {
            found: productLoaded,
            __: productNotFound,
        },
    });

    sample({
        clock: productNotFound,
        source: $currentProductAlias,
        filter: Boolean,
        fn: (alias: string) => alias,
        target: getProductFx,
    });

    sample({
        clock: getProductFx.doneData,
        fn: (res) => res ?? null,
        target: $currentProduct,
    });

    sample({
        clock: productLoaded,
        target: $currentProduct,
    });

    const productPage = declarePage<{ category: string; product: string }>({
        pageType: 'productPage',
    });

    sample({
        clock: productViewStarted,
        target: getProductsFx,
    });

    sample({
        clock: productPage.open,
        fn: ({ product }) => product,
        target: singleRequested,
    });

    return {
        productPage,
        $products,
        $currentProduct,
        productViewStarted,
    };
});
