import { FC } from 'react';
import { Flex, Typography } from 'antd';
import Image from 'next/image';
import { Product } from '@/entities/products';

type Props = {
    product: Product | null;
};

export const ProductDetail: FC<Props> = ({ product }) => {
    return (
        <Flex vertical gap={24}>
            <div className={'flex justify-between bg-white p-2 rounded-md'}>
                <Flex vertical>
                    <Typography>Алиас: {product?.alias}</Typography>
                    <Typography>Категория: {product?.categoryName}</Typography>
                </Flex>
                <Flex align={'end'} vertical>
                    <Typography>Создан: {product?.createdAt}</Typography>
                    <Typography>Обновлен: {product?.updatedAt}</Typography>
                </Flex>
            </div>
            <div className={'w-fit p-4 bg-white ml-auto rounded-md'}>
                {product?.image && (
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        priority
                    />
                )}
            </div>
            <div className={'bg-white p-2 flex flex-col rounded-md'}>
                <Typography>Meta-Title: {product?.metaTitle}</Typography>
                <Typography>
                    Meta-Description: {product?.metaDescription}
                </Typography>
            </div>
            <div>
                <Typography className={'mb-1'}>Описание</Typography>
                {product?.text && (
                    <div
                        className={'rounded-md p-2 bg-white'}
                        dangerouslySetInnerHTML={{ __html: product?.text }}
                    />
                )}
            </div>
        </Flex>
    );
};
