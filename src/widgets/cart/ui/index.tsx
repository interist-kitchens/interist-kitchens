'use client';

import { useUnit } from 'effector-react';
import { cartModel } from '@/entities/leads/model';
import ClientOnly from '@/shared/ui/ClientOnly';
import { DeliveryForm, ProductCart } from '@/entities/leads';
import { Button, Radio, Tabs } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Title } from '@/shared/ui/Typography';
import { useState } from 'react';
import { PaymentType } from '@/entities/leads/api';

const { Group: RadioGroup } = Radio;

export const CartBlock = () => {
    const [
        cart,
        count,
        total,
        clearCart,
        isValid,
        deliveryForm,
        submit,
        loading,
    ] = useUnit([
        cartModel.$cart,
        cartModel.$cartCount,
        cartModel.$cartTotal,
        cartModel.clearCart,
        cartModel.$deliveryFormValid,
        cartModel.$deliveryForm,
        cartModel.submitCartOrder,
        cartModel.$pending,
    ]);

    const [payment, setPayment] = useState<PaymentType>('cash');

    const handleSubmit = () => {
        submit({
            products: cart,
            delivery: deliveryForm,
            payment,
        });
    };

    return (
        <ClientOnly>
            <section>
                {cart?.length === 0 && <div>Корзина пуста</div>}
                {cart?.length > 0 && (
                    <>
                        <div className="mb-3">
                            <span id="resumaCart">
                                {`${count} ТОВАР(А) В КОРЗИНЕ ПОКУПОК, `}
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
                        <hr />
                        <div className={'my-4'}>
                            <Title level={3}>Доставка</Title>
                            <Tabs
                                defaultActiveKey="1"
                                tabPosition={'left'}
                                items={[
                                    {
                                        key: '1',
                                        label: 'Доставка по городу Омск',
                                        children: <DeliveryForm />,
                                        destroyInactiveTabPane: true,
                                    },
                                    {
                                        key: '2',
                                        label: 'Доставка',
                                        children: 'Доставка',
                                    },
                                ]}
                            />
                        </div>
                        <hr />
                        <div className={'my-4'}>
                            <Title level={3}>Оплата</Title>
                            <RadioGroup
                                name="radiogroup"
                                defaultValue={payment}
                                options={[
                                    { value: 'cash', label: 'Наличными' },
                                ]}
                                onChange={(e) => {
                                    setPayment(e.target.value);
                                }}
                            />
                        </div>
                        <hr />
                        <div className={'my-4 flex justify-end'}>
                            <Button
                                size={'large'}
                                type={'primary'}
                                onClick={handleSubmit}
                                disabled={!isValid}
                                loading={loading}
                            >
                                Оформить заказ
                            </Button>
                        </div>
                    </>
                )}
            </section>
        </ClientOnly>
    );
};
