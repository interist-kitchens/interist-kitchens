import { FC } from 'react';
import { AttributesResponse } from '@/entities/attributes';
import { AttributeTable } from '@/features/attributes';
import { Title } from '@/shared/ui/Typography';

type Props = {
    attributes?: AttributesResponse;
};

export const AttributesAdminPage: FC<Props> = ({ attributes }) => {
    return (
        <>
            <Title>Управление атрибутами</Title>
            <AttributeTable attributes={attributes} />
        </>
    );
};
