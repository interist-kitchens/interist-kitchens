import { attributesListAdminModel, getAttributes } from '@/entities/attributes';
import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { AttributesAdminPage } from '@/page-content/attributes';

async function preload() {
    const attributes = await getAttributes();

    return attributes;
}

export default async function AttributesPage() {
    const scope = fork();

    const attributes = await preload();

    await allSettled(attributesListAdminModel.attributesListAdminPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <AttributesAdminPage attributes={attributes} />
        </EffectorNext>
    );
}
