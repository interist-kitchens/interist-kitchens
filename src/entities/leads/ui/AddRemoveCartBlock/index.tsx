import { Button, Flex } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { FC, SyntheticEvent } from 'react';
import { useUnit } from 'effector-react';
import { cartModel } from '@/entities/leads/model';
import { Product } from '@/entities/products';

type Props = {
    product: Omit<
        Product,
        | 'createdAt'
        | 'updatedAt'
        | 'metaTitle'
        | 'metaDescription'
        | 'categoryId'
        | 'text'
        | 'images'
    >;
};

export const AddRemoveCartBlock: FC<Props> = ({ product }) => {
    const [add, remove, cart] = useUnit([
        cartModel.addToCart,
        cartModel.removeFromCart,
        cartModel.$cart,
    ]);

    const handleAddToCart = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        add({ product, count: 1 });
    };

    const handleRemoveFromCart = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        remove({ product });
    };

    return (
        <Flex align={'center'} justify={'center'} gap={12}>
            <Button
                onClick={handleRemoveFromCart}
                size={'large'}
                icon={<MinusOutlined />}
                color={'primary'}
            />
            <div>
                {cart.find((item) => item.product.id === product.id)?.count ||
                    0}
            </div>
            <Button
                onClick={handleAddToCart}
                size={'large'}
                icon={<PlusOutlined />}
                color={'primary'}
            />
        </Flex>
    );
};
