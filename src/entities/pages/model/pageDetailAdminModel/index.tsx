import { atom } from '@/shared/factory/atom';
import {
    createEffect,
    createEvent,
    createStore,
    sample,
    split,
} from 'effector';
import { declarePage } from '@/shared/app';
import { Page } from '@prisma/client';
import { getPage, getPages } from '@/entities/pages';

export const pageDetailAdminModel = atom(() => {
    const pageViewStarted = createEvent();
    const singleRequested = createEvent<string>();

    const pageLoaded = createEvent<Page>();
    const pageNotFound = createEvent<null>();

    const getPagesFx = createEffect(getPages);
    const getPageFx = createEffect(getPage);

    const $pages = createStore<Page[]>([]);
    const $currentPageId = createStore<string | null>(null);
    const $currentPage = createStore<Page | null>(null);

    $pages.on(getPagesFx.doneData, (_, result) => result);

    $currentPageId.on(singleRequested, (_, alias) => alias);

    split({
        source: sample({
            clock: singleRequested,
            source: $pages,
            fn: (pages, alias) =>
                pages.find((page) => page.alias === alias) ?? null,
        }),
        match: {
            found: (page: Page | null) => page !== null,
        },
        cases: {
            found: pageLoaded,
            __: pageNotFound,
        },
    });

    sample({
        clock: pageNotFound,
        source: $currentPageId,
        filter: Boolean,
        fn: (alias: string) => alias,
        target: getPageFx,
    });

    sample({
        clock: getPageFx.doneData,
        fn: (res) => res ?? null,
        target: $currentPage,
    });

    sample({
        clock: pageLoaded,
        target: $currentPage,
    });

    const pageDetailAdminPage = declarePage<{ alias: string }>({
        pageType: 'pageDetailAdminPage',
    });

    const pageEditAdminPage = declarePage<{ alias: string }>({
        pageType: 'pageEditAdminPage',
    });

    sample({
        clock: pageViewStarted,
        target: getPagesFx,
    });

    sample({
        clock: [pageDetailAdminPage.open, pageEditAdminPage.open],
        fn: ({ alias }) => alias,
        target: singleRequested,
    });

    return {
        pageViewStarted,
        $pages,
        $currentPage,
        pageDetailAdminPage,
        pageEditAdminPage,
    };
});
