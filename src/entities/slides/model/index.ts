import { atom } from '@/shared/factory/atom';
import { declarePage } from '@/shared/app';

export const slidesListModel = atom(() => {
    const slidesListAdminPage = declarePage({
        pageType: 'sliderAdminPage',
    });

    return { slidesListAdminPage };
});
