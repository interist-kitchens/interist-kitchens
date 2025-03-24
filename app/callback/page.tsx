import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { CallbackPage, callbackPage } from '@/page-content/callbackPage';

export default async function Page() {
    const scope = fork();

    await allSettled(callbackPage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CallbackPage />
        </EffectorNext>
    );
}
