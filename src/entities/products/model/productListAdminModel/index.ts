import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const productListAdminModel = atom(() => {
    const productListAdminPage = declarePage({
        pageType: 'productListAdminPage',
    });

    return { productListAdminPage };
});
