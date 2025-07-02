import { FC } from 'react';
import { Flex } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    product: {
        name: string;
        id: number;
        image: string;
        imageBlur?: string | null;
        alias: string;
        price: string;
    };
    href: string;
};

export const ProductCard: FC<Props> = ({ product, href }) => {
    return (
        <div className={'lg:h-[300px] 2xl:h-[350px] sm:pr-6'}>
            <div className={'flex flex-col h-full justify-between'}>
                <div className={'h-[290px] overflow-hidden'}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={420}
                        height={290}
                        placeholder={'blur'}
                        blurDataURL={product.imageBlur ?? ''}
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
