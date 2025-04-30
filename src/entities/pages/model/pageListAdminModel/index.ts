import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const pageListAdminModel = atom(() => {
    const pageListAdminPage = declarePage({
        pageType: 'pageListAdminPage',
    });
    return { pageListAdminPage };
});
