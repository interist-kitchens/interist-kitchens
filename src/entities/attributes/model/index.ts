import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const attributesListAdminModel = atom(() => {
    const attributesListAdminPage = declarePage({
        pageType: 'attributesListAdminPage',
    });

    return {
        attributesListAdminPage,
    };
});
