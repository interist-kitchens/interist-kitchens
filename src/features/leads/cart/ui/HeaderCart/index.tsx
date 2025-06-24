'use client';

import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import { Badge, Button } from 'antd';
import { useUnit } from 'effector-react';
import { cartModel } from '@/entities/leads/model';
import { useRouter } from 'next/navigation';
import ClientOnly from '@/shared/ui/ClientOnly';

export const HeaderCart = () => {
    const count = useUnit(cartModel.$cartCount);
    const router = useRouter();

    const handleCartClick = () => {
        router.push('/cart');
    };

    return (
        <ClientOnly>
            <Badge count={count} offset={[-5, 10]} color="#5e94b9" size="small">
                <Button
                    shape="circle"
                    icon={<ShoppingCartOutlined />}
                    type="text"
                    size="large"
                    onClick={handleCartClick}
                />
            </Badge>
        </ClientOnly>
    );
};
