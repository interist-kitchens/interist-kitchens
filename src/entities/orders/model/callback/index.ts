import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const callbackListAdminModel = atom(() => {
    const callbackListAdminPage = declarePage({
        pageType: 'callbackListAdminPage',
    });

    return { callbackListAdminPage };
});
