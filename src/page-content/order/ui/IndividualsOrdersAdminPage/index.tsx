import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { IndividualOrder, IndividualsOrdersAdminList } from '@/entities/orders';

type Props = {
    orders: IndividualOrder[];
};

export const IndividualsOrdersAdminPage: FC<Props> = ({ orders }) => {
    return (
        <>
            <Title>Заказы на индивидуальный просчет</Title>
            <IndividualsOrdersAdminList orders={orders} />
        </>
    );
};
