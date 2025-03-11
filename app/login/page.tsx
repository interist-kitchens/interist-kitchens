import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { LoginPage, loginPage } from '@/page-content/loginPage';

export default async function Page() {
    const scope = fork();

    await allSettled(loginPage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <LoginPage />
        </EffectorNext>
    );
}
