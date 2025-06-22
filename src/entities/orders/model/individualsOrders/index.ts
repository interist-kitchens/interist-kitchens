import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const individualsOrdersAdminModel = atom(() => {
    const individualsOrdersAdminPage = declarePage({
        pageType: 'individualsOrdersAdminPage',
    });

    return { individualsOrdersAdminPage };
});
