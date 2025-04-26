import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { Callback, CallbackAdminList } from '@/entities/orders';

type Props = {
    callbackList: Callback[];
};

export const CallbackListAdminPage: FC<Props> = ({ callbackList }) => {
    return (
        <>
            <Title>Список заказаных звонков с сайта</Title>
            <CallbackAdminList callbackList={callbackList} />
        </>
    );
};
