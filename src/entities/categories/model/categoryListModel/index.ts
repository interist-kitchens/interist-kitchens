import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';
import {
    createEffect,
    createEvent,
    createStore,
    sample,
    split,
} from 'effector';
import {
    Categories,
    getCategories,
    getCategoryByAlias,
} from '@/entities/categories';

export const categoryListModel = atom(() => {
    const categoryListViewStarted = createEvent();
    const singleRequested = createEvent<string>();

    const categoryLoaded = createEvent<Categories>();
    const categoryNotFound = createEvent<null>();

    const getCategoriesFx = createEffect(getCategories);
    const getCategoryFx = createEffect(getCategoryByAlias);

    const $categories = createStore<Categories[]>([]);
    const $currentCategoryAlias = createStore<string | null>(null, {
        sid: '$currentCategoryAlias',
    });
    const $currentCategory = createStore<Categories | null>(null, {
        sid: '$currentCategory',
    });

    $categories.on(getCategoriesFx.doneData, (_, result) => result);

    $currentCategoryAlias.on(singleRequested, (_, alias) => alias);

    split({
        source: sample({
            clock: singleRequested,
            source: $categories,
            fn: (categories, alias) =>
                categories.find((category) => category.alias === alias) ?? null,
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
        source: $currentCategoryAlias,
        filter: Boolean,
        fn: (alias: string) => alias,
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

    const categoryListPage = declarePage<{ category: string }>({
        pageType: 'categoryListPage',
    });

    sample({
        clock: categoryListViewStarted,
        target: getCategoriesFx,
    });

    sample({
        clock: categoryListPage.open,
        fn: ({ category }) => category,
        target: singleRequested,
    });

    return {
        categoryListPage,
        $categories,
        $currentCategory,
        categoryListViewStarted,
    };
});
