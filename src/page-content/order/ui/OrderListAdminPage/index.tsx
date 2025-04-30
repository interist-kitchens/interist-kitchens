import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { Order, OrderListAdmin } from '@/entities/orders';

type Props = {
    orders: Order[];
};

export const OrderListAdminPage: FC<Props> = ({ orders }) => {
    return (
        <>
            <Title>Заказы</Title>
            <OrderListAdmin orders={orders} />
        </>
    );
};
