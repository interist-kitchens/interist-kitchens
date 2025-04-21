import { FC } from 'react';
import { Flex } from 'antd';
import Image from 'next/image';
import { Product } from '@/entities/products';
import Link from 'next/link';

type Props = {
    product: Product;
    href: string;
};

export const ProductCard: FC<Props> = ({ product, href }) => {
    return (
        <div className={'lg:h-[300px] 2xl:h-[350px] sm:pr-6'}>
            <div className={'flex flex-col h-full justify-between'}>
                <div className={'h-[290px]'}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={420}
                        height={290}
                    />
                </div>
                <Link href={href}>
                    <Flex vertical className={'text-black'}>
                        <div className={'text-xl'}>{product.name}</div>
                        <div
                            className={'text-3xl 2xl:text-4xl font-bold'}
                        >{`от ${product.price} ₽/м`}</div>
                    </Flex>
                </Link>
            </div>
        </div>
    );
};
