import { atom } from '@/shared/factory/atom';
import {
    Categories,
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
} from '@/entities/categories';
import {
    createEffect,
    createEvent,
    createStore,
    sample,
    split,
    StoreValue,
} from 'effector';
import { declarePage } from '@/shared/app';

export const categoriesModel = atom(() => {
    const categoriesAdminPage = declarePage({
        pageType: 'categoriesAdmin',
    });
    return { categoriesAdminPage };
});

export const createCategoryModel = atom(() => {
    const submitCreate = createCategory.start;

    const reset = createCategory.reset;

    const $pending = createCategory.$pending;
    const $isSuccess = createStore(false).on(
        createCategory.$succeeded,
        (_, payload) => payload
    );
    const $isError = createStore(false).on(
        createCategory.$failed,
        (_, payload) => payload
    );
    const $error = createStore<string>('');

    sample({
        source: createCategory.finished.failure,
        fn: (res) => res.error.response?.data?.code ?? '',
        target: $error,
    });

    const categoriesAdminCreatePage = declarePage({
        pageType: 'categoriesAdminCreate',
    });

    return {
        submitCreate,
        $pending,
        $isSuccess,
        $isError,
        $error,
        reset,
        categoriesAdminCreatePage,
    };
});

export const categoryDeleteModel = atom(() => {
    const submitDelete = deleteCategory.start;

    const reset = deleteCategory.reset;

    const $pending = deleteCategory.$pending;
    const $isSuccess = deleteCategory.$finished;
    const $currentId = createStore<string>('').on(
        deleteCategory.start,
        (_, payload) => payload.id
    );

    return { submitDelete, $pending, $isSuccess, reset, $currentId };
});

export const categoryViewModel = atom(() => {
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
        filter: (id: StoreValue<typeof $currentCategoryId>): id is string =>
            id !== null,
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

    const categoryAdminPage = declarePage<{ id: string }>({
        pageType: 'categoryAdmin',
    });

    sample({
        clock: categoryViewStarted,
        target: getCategoriesFx,
    });

    sample({
        clock: categoryAdminPage.open,
        fn: ({ id }) => id,
        target: singleRequested,
    });

    return {
        categoryViewStarted,
        $categories,
        $currentCategory,
        categoryAdminPage,
    };
});
