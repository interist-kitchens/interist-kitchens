import { prisma } from '@/shared/prisma/prisma-client';
import { Callback } from '@/entities/orders/api/types';

export const getCallbackList = async (): Promise<Callback[]> => {
    const callbackList: Callback[] = await prisma.callback.findMany();

    return callbackList;
};
