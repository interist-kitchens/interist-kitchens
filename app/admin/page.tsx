import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { AdminPage, adminPage } from '@/page-content/admin';

export default async function Page() {
    const scope = fork();

    await allSettled(adminPage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <AdminPage />
        </EffectorNext>
    );
}
