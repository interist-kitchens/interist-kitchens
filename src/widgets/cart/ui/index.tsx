'use client';

import { useUnit } from 'effector-react';
import { cartModel } from '@/entities/leads/model';
import ClientOnly from '@/shared/ui/ClientOnly';
import { ProductCart } from '@/entities/leads';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const CartBlock = () => {
    const [cart, count, total, clearCart] = useUnit([
        cartModel.$cart,
        cartModel.$cartCount,
        cartModel.$cartTotal,
        cartModel.clearCart,
    ]);

    return (
        <ClientOnly>
            <section>
                {cart?.length === 0 && <div>Корзина пуста</div>}
                {cart?.length > 0 && (
                    <>
                        <div className="mb-3">
                            <span id="resumaCart">
                                {`${count} ТОВАРЫ В КОРЗИНЕ ПОКУПОК, `}
                            </span>
                            <strong className="price price--fixed-size">
                                {new Intl.NumberFormat('ru-RU', {
                                    currency: 'RUB',
                                    style: 'currency',
                                }).format(total)}
                            </strong>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <div className="flex flex-col lg:flex-row items-center">
                                <div className="lg:w-7/12" />
                                <div className="hidden lg:block lg:w-5/12">
                                    <div className="flex">
                                        <div className="w-1/2 text-right">
                                            <span className="font-bold">
                                                Количество
                                            </span>
                                        </div>
                                        <div className="w-1/2 text-right">
                                            <span className="font-bold">
                                                Стоимость
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            {cart.map(({ product, count }) => (
                                <ProductCart
                                    key={product.id}
                                    product={product}
                                    count={count}
                                />
                            ))}
                            <hr />
                            <div className={'flex justify-end my-4'}>
                                <Button
                                    onClick={clearCart}
                                    icon={<DeleteOutlined />}
                                    shape={'round'}
                                    variant={'text'}
                                    color={'default'}
                                >
                                    Удалить все товары
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </ClientOnly>
    );
};
