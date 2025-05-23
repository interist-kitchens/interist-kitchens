import { prisma } from '@/shared/prisma/prisma-client';
import { Callback, Order } from '@/entities/orders/api/types';

export const getCallbackList = async (): Promise<Callback[]> => {
    try {
        const callbackList: Callback[] = await prisma.callback.findMany();

        return callbackList;
    } catch (error) {
        console.error(error);
    }

    return [];
};

export const getOrders = async (): Promise<Order[]> => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: true,
                user: true,
            },
        });

        return orders;
    } catch (error) {
        console.error(error);
    }

    return [];
};
