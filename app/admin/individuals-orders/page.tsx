import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { IndividualsOrdersAdminPage } from '@/page-content/order';
import { getIndividualsOrders } from '@/entities/orders';
import { individualsOrdersAdminModel } from '@/entities/orders/model/individualsOrders';

async function preload() {
    'use server';

    const orders = await getIndividualsOrders();

    return orders;
}

export default async function Page() {
    const scope = fork();

    const orders = await preload();

    await allSettled(
        individualsOrdersAdminModel.individualsOrdersAdminPage.open,
        {
            scope,
        }
    );

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <IndividualsOrdersAdminPage orders={orders} />
        </EffectorNext>
    );
}
