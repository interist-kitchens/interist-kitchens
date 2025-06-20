'use client';

import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import { Badge, Button } from 'antd';
import { useUnit } from 'effector-react';
import { $cartCount } from '@/entities/leads/model';

export const HeaderCart = () => {
    const [count] = useUnit([$cartCount]);

    return (
        <Badge count={count} offset={[-5, 10]} color="#5e94b9" size="small">
            <Button
                shape="circle"
                icon={<ShoppingCartOutlined />}
                type="text"
                size="large"
            />
        </Badge>
    );
};
