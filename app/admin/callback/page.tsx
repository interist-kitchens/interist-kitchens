import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';

import { callbackListAdminModel } from '@/entities/orders/model';
import { CallbackListAdminPage } from '@/page-content/order';
import { getCallbackList } from '@/entities/orders';

async function preload() {
    'use server';

    const callbackList = await getCallbackList();

    return callbackList;
}

export default async function Page() {
    const scope = fork();

    const callbackList = await preload();

    await allSettled(callbackListAdminModel.callbackListAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CallbackListAdminPage callbackList={callbackList} />
        </EffectorNext>
    );
}
