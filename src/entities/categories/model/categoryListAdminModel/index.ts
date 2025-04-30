import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const categoryListAdminModel = atom(() => {
    const categoriesAdminPage = declarePage({
        pageType: 'categoriesAdminPage',
    });
    return { categoriesAdminPage };
});
