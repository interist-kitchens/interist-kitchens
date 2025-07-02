import { FC } from 'react';
import Image from 'next/image';
import { Typography } from 'antd';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import { Categories } from '@/entities/categories';

type Props = {
    category: Categories;
    product: {
        name: string;
        id: number;
        image: string;
        imageBlur?: string | null;
        alias: string;
        price: string;
    };
};

export const ProductListingCard: FC<Props> = ({ category, product }) => {
    return (
        <Link
            href={`${paths.catalog}/${category.alias}/${product.alias}`}
            className={'flex flex-col'}
        >
            <div className={'w-full h-[358px] relative'}>
                <Image
                    key={product.image}
                    src={product.image}
                    alt={product.name}
                    placeholder={'blur'}
                    blurDataURL={product.imageBlur ?? ''}
                    fill
                    priority
                />
            </div>
            <div
                className={
                    'bg-white px-7 py-6 grid sm:grid-cols-2 items-center text-black gap-y-2'
                }
            >
                <div className={'flex flex-col'}>
                    <Typography>{category.name}</Typography>
                    <div className={'text-3xl font-bold'}>{product.name}</div>
                </div>
                <div className={'flex flex-col sm:justify-self-end'}>
                    <div
                        className={'text-2xl font-semibold'}
                    >{`от ${Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        maximumFractionDigits: 0,
                    }).format(parseInt(product.price))} `}</div>
                    <div className={'text-gray-400'}>за погонный метр</div>
                </div>
            </div>
        </Link>
    );
};
