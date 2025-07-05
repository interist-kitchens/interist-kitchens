import { usePathname } from 'next/navigation';
import { getLastPathSegment } from '@/shared/lib/getLastPathSegment';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { protectedRoutes } from '@/shared/routing';
import { MENU_KEYS } from '@/widgets/headerMenu/constants';

export const useMenuKeyFromPath = (
    setKey: Dispatch<SetStateAction<string[] | undefined>>
) => {
    const pathname = usePathname();
    const pathLastSegment = getLastPathSegment(pathname);

    useEffect(() => {
        if (protectedRoutes?.includes(pathLastSegment)) {
            setKey([MENU_KEYS.userInfo]);
        }
        if (!protectedRoutes?.includes(pathLastSegment) && pathLastSegment) {
            setKey([pathLastSegment]);
        }
    }, [pathLastSegment, setKey]);
};
