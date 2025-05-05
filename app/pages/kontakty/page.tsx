import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { Contacts } from '@/page-content/pages';
import { contactsPage } from '@/page-content/pages/model';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'QКухни - Контакты',
    description: 'Компания QКухни - информация о контактах.',
};

export default async function Page() {
    const scope = fork();

    await allSettled(contactsPage.open, { scope });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <Contacts />
        </EffectorNext>
    );
}
