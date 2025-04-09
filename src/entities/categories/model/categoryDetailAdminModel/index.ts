import { atom } from '@/shared/factory/atom';
import {
    createEffect,
    createEvent,
    createStore,
    sample,
    split,
} from 'effector';
import { Categories, getCategories, getCategory } from '@/entities/categories';
import { declarePage } from '@/shared/app';

export const categoryDetailAdminModel = atom(() => {
    const categoryViewStarted = createEvent();
    const singleRequested = createEvent<string>();

    const categoryLoaded = createEvent<Categories>();
    const categoryNotFound = createEvent<null>();

    const getCategoriesFx = createEffect(getCategories);
    const getCategoryFx = createEffect(getCategory);

    const $categories = createStore<Categories[]>([]);
    const $currentCategoryId = createStore<string | null>(null);
    const $currentCategory = createStore<Categories | null>(null);

    $categories.on(getCategoriesFx.doneData, (_, result) => [...result]);

    $currentCategoryId.on(singleRequested, (_, id) => id);

    split({
        source: sample({
            clock: singleRequested,
            source: $categories,
            fn: (categories, id) =>
                categories.find((category) => category.id === id) ?? null,
        }),
        match: {
            found: (category: Categories | null) => category !== null,
        },
        cases: {
            found: categoryLoaded,
            __: categoryNotFound,
        },
    });

    sample({
        clock: categoryNotFound,
        source: $currentCategoryId,
        filter: Boolean,
        fn: (id: string) => id,
        target: getCategoryFx,
    });

    sample({
        clock: getCategoryFx.doneData,
        fn: (res) => res ?? null,
        target: $currentCategory,
    });

    sample({
        clock: categoryLoaded,
        target: $currentCategory,
    });

    const categoryDetailAdminPage = declarePage<{ id: string }>({
        pageType: 'categoryDetailAdminPage',
    });

    const categoryEditAdminPage = declarePage<{ id: string }>({
        pageType: 'categoryEditAdminPage',
    });

    sample({
        clock: categoryViewStarted,
        target: getCategoriesFx,
    });

    sample({
        clock: [categoryDetailAdminPage.open, categoryEditAdminPage.open],
        fn: ({ id }) => id,
        target: singleRequested,
    });

    return {
        categoryViewStarted,
        $categories,
        $currentCategory,
        categoryDetailAdminPage,
        categoryEditAdminPage,
    };
});
