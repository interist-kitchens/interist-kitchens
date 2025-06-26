import { prisma } from '@/shared/prisma/prisma-client';
import {
    Callback,
    IndividualOrder,
    Order,
    UserOrder,
} from '@/entities/orders/api/types';

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

export const getUserOrders = async (
    userId: string
): Promise<UserOrder[] | null> => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return orders;
    } catch (error) {
        console.error('Failed to fetch user order:', error);
        return null;
    }
};
