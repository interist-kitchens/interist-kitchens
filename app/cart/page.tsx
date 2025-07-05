import { Metadata } from 'next';
import { fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { Cart } from '@/page-content/cart';

export const metadata: Metadata = {
    title: 'Interest Mebel - Корзина',
    description: 'Компания Interest Mebel - Корзина.',
};

export default async function Page() {
    const scope = fork();

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <Cart />
        </EffectorNext>
    );
}
