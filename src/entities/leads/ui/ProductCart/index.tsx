import { Product } from '@/entities/products';
import { FC } from 'react';
import { AddRemoveCartBlock } from '@/entities/leads';
import Link from 'next/link';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';
import { cartModel } from '@/entities/leads/model';
import Image from 'next/image';

type Props = {
    product: Product;
    count: number;
};

export const ProductCart: FC<Props> = ({ product, count }) => {
    const [removeFromCart] = useUnit([cartModel.removeFromCartByProduct]);

    return (
        <div className="my-2">
            <div className="flex items-center flex-col md:flex-row gap-y-4">
                <div className="md:w-7/12 w-full">
                    <div className="flex items-start">
                        <div className="flex items-center mr-3">
                            <Link
                                href={`/catalog/${product.categories.alias}/${product.alias}`}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={140}
                                    height={140}
                                />
                            </Link>
                        </div>
                        <div>
                            <div>
                                <strong className="flex gap-x-2">
                                    <span>{`${count}x`}</span>
                                    <Link
                                        href={`/catalog/${product.categories.alias}/${product.alias}`}
                                        className={'text-black decoration-none'}
                                    >
                                        {product.name}
                                    </Link>
                                </strong>
                            </div>
                            <div className="inline-flex gap-x-0.5">
                                <span className={'text-3xl font-bold'}>
                                    {new Intl.NumberFormat('ru-RU').format(
                                        parseFloat(product.price)
                                    )}
                                </span>
                                <span className={'text-xl font-bold'}>₽</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex lg:w-5/12 w-full h-full flex-col md:flex-row gap-4">
                    <div className="flex md:justify-end w-1/2">
                        <AddRemoveCartBlock product={product} />
                    </div>
                    <div className="flex w-1/2 items-center md:justify-end">
                        <span data-subtotal={count * parseFloat(product.price)}>
                            <strong>
                                <p className="m-0">
                                    {new Intl.NumberFormat('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB',
                                    }).format(
                                        count * parseFloat(product.price)
                                    )}
                                </p>
                            </strong>
                        </span>
                    </div>
                </div>
            </div>
            <div className={'flex justify-end'}>
                <Button
                    icon={<DeleteOutlined />}
                    color="default"
                    variant="text"
                    onClick={() => removeFromCart({ product })}
                />
            </div>
        </div>
    );
};
