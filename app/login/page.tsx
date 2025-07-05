import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { LoginPage, loginPage } from '@/page-content/loginPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Вход',
    description: 'Компания Interest Mebel авторизация.',
};

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
