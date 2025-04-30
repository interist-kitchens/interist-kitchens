import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const ordersAdminModel = atom(() => {
    const ordersAdminPage = declarePage({
        pageType: 'ordersAdminPage',
    });

    return { ordersAdminPage };
});
