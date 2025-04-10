import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';
import {
    createEffect,
    createEvent,
    createStore,
    sample,
    split,
} from 'effector';
import { getProduct, getProducts, Product } from '@/entities/products';

export const productDetailAdminModel = atom(() => {
    const productViewStarted = createEvent();
    const singleRequested = createEvent<string>();

    const productLoaded = createEvent<Product>();
    const productNotFound = createEvent<null>();

    const getProductsFx = createEffect(getProducts);
    const getProductFx = createEffect(getProduct);

    const $products = createStore<Product[]>([]);
    const $currentProductId = createStore<string | null>(null);
    const $currentProduct = createStore<Product | null>(null);

    $products.on(getProductsFx.doneData, (_, result) => [...result]);

    $currentProductId.on(singleRequested, (_, id) => id);

    split({
        source: sample({
            clock: singleRequested,
            source: $products,
            fn: (products, id) =>
                products.find((product) => product.id === id) ?? null,
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
        source: $currentProductId,
        filter: Boolean,
        fn: (id: string) => id,
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

    const productDetailAdminPage = declarePage<{ id: string }>({
        pageType: 'productDetailAdminPage',
    });

    sample({
        clock: productViewStarted,
        target: getProductsFx,
    });

    sample({
        clock: productDetailAdminPage.open,
        fn: ({ id }) => id,
        target: singleRequested,
    });

    return {
        productDetailAdminPage,
        $products,
        $currentProduct,
        productViewStarted,
    };
});
