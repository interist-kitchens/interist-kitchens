import { prisma } from '@/shared/prisma/prisma-client';
import { Callback, IndividualOrder, Order } from '@/entities/orders/api/types';

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
                user: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return orders;
    } catch (error) {
        console.error(error);
    }

    return [];
};

export const getIndividualsOrders = async (): Promise<IndividualOrder[]> => {
    try {
        const orderList: IndividualOrder[] =
            await prisma.individualOrder.findMany({
                include: {
                    product: true,
                },
            });

        return orderList;
    } catch (error) {
        console.error(error);
    }

    return [];
};
