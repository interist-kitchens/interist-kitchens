'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export const CallBackButton = () => {
    const { push } = useRouter();
    const handleCallBack = () => {
        push('/callback');
    };

    return (
        <Button onClick={handleCallBack} type="primary">
            Заказать звонок
        </Button>
    );
};
