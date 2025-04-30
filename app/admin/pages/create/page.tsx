import { allSettled, fork, serialize } from 'effector';

import { EffectorNext } from '@effector/next';
import { pageCreateAdminModel } from '@/entities/pages/model/pageCreateAdminModel';
import { PageCreateAdminPanel } from '@/page-content/pages';

export default async function Page() {
    const scope = fork();

    await allSettled(pageCreateAdminModel.pageCreateAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <PageCreateAdminPanel />
        </EffectorNext>
    );
}
