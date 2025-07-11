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
        <article className={'lg:h-[300px] 2xl:h-[350px] sm:pr-6'}>
            <div className={'flex flex-col h-full justify-between'}>
                <div className={'h-[230px] overflow-hidden relative'}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                        placeholder={product.imageBlur ? 'blur' : 'empty'}
                        blurDataURL={product.imageBlur ?? undefined}
                    />
                </div>
                <Link
                    href={href}
                    aria-label={`Перейти к продукту ${product.name}`}
                >
                    <Flex vertical className={'text-black'}>
                        <div className={'text-xl'}>{product.name}</div>
                        <div
                            className={'text-3xl 2xl:text-4xl font-bold'}
                        >{`от ${product.price} ₽/м`}</div>
                    </Flex>
                </Link>
            </div>
        </article>
    );
};
