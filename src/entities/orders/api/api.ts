'use server';

import { prisma } from '@/shared/prisma/prisma-client';
import {
    Callback,
    IndividualOrder,
    Order,
    UserOrder,
} from '@/entities/orders/api/types';
import { unstable_cache } from 'next/cache';

export const getCallbackList = unstable_cache(
    async (): Promise<Callback[]> => {
        try {
            const callbackList: Callback[] = await prisma.callback.findMany();

            return callbackList;
        } catch (error) {
            console.error(error);
        }

        return [];
    },
    ['callback-list'],
    { tags: ['callback-list'], revalidate: 3600 }
);

export const getOrders = unstable_cache(
    async (): Promise<Order[]> => {
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
    },
    ['orders'],
    { tags: ['orders'], revalidate: 3600 }
);

export const getIndividualsOrders = unstable_cache(
    async (): Promise<IndividualOrder[]> => {
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
    },
    ['individual-orders'],
    { tags: ['individual-orders'], revalidate: 3600 }
);

export const getUserOrders = unstable_cache(
    async (userId: string): Promise<UserOrder[] | null> => {
        try {
            const orders = await prisma.order.findMany({
                where: { userId },
                select: {
                    id: true,
                    status: true,
                    createdAt: true,
                    items: {
                        select: {
                            quantity: true,
                            product: {
                                select: {
                                    name: true,
                                    price: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                take: 10,
            });

            return orders;
        } catch (error) {
            console.error('Failed to fetch user order:', error);
            return null;
        }
    },
    ['orders'],
    { tags: ['orders'], revalidate: 3600 }
);
