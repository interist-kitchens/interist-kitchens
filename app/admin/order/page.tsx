import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { OrderListAdminPage } from '@/page-content/order';
import { getOrders } from '@/entities/orders';
import { ordersAdminModel } from '@/entities/orders/model/order';

async function preload() {
    'use server';

    const orders = await getOrders();

    return orders;
}

export default async function Page() {
    const scope = fork();

    const orders = await preload();

    await allSettled(ordersAdminModel.ordersAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <OrderListAdminPage orders={orders} />
        </EffectorNext>
    );
}
