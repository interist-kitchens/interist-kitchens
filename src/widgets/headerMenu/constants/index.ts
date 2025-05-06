import { getLastPathSegment } from '@/shared/lib/getLastPathSegment';
import { paths } from '@/shared/routing';

export const MENU_KEYS = {
    catalog: getLastPathSegment(`${paths.catalog}`),
    contacts: getLastPathSegment(`${paths.contacts}`),
    montage: `${paths.montage}`,
    delivery: `${paths.delivery}`,
    conditionsMontage: `${paths.conditionsMontage}`,
    warranty: `${paths.warranty}`,
    userInfo: 'user-info',
    callBackButton: 'call-back-button',
    phone: 'phone',
} as const;
