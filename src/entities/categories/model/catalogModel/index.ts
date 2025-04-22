import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const catalogModel = atom(() => {
    const catalogPage = declarePage({
        pageType: 'catalogPage',
    });

    return { catalogPage };
});
