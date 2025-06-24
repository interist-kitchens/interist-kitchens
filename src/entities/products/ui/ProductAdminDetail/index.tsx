import { FC } from 'react';
import { Flex, Tag } from 'antd';
import { Product } from '@/entities/products';
import Image from 'next/image';
import { TextDecor } from '@/shared/ui/TextDecor';
import { Text, Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import {
    relationTypeToColor,
    relationTypeToName,
} from '@/entities/products/lib';

type Props = {
    product: Product;
};

export const ProductAdminDetail: FC<Props> = ({ product }) => {
    return (
        <Flex vertical gap={24}>
            <div className={'flex justify-between bg-white p-2 rounded-md'}>
                <Flex vertical>
                    <TextDecor name={'Алиас'} value={product?.alias} />
                    <TextDecor
                        name={'Категория'}
                        value={product?.categoryName}
                    />
                    <TextDecor name={'Создан'} value={product?.createdAt} />
                    <TextDecor name={'Обновлен'} value={product?.updatedAt} />
                </Flex>
                {product?.image && (
                    <div className={'w-fit p-4 bg-white ml-auto rounded-md'}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            priority
                        />
                    </div>
                )}
            </div>
            <div className={'bg-white p-2 flex flex-col rounded-md'}>
                <TextDecor name={'Цена'} value={product?.price} />
            </div>
            <div className={'bg-white p-2 flex flex-col rounded-md'}>
                <TextDecor name={'Meta-Title'} value={product?.metaTitle} />
                <TextDecor
                    name={'Meta-Description'}
                    value={product?.metaDescription}
                />
            </div>
            <div>
                <Text className={'mb-1'} strong>
                    Описание
                </Text>
                <div className={'rounded-md p-2 bg-white'}>
                    {product?.text ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: product?.text }}
                        />
                    ) : (
                        <span className={'text-gray-400'}>Текста пока нет</span>
                    )}
                </div>
            </div>
            <div>
                <Text className={'mb-1'} strong>
                    Доп. картинки
                </Text>
                <div className={'bg-white w-full rounded-md p-4'}>
                    <Flex gap={8}>
                        {product?.images &&
                            product?.images.map((image) => (
                                <div className={'w-fit'} key={image.image}>
                                    <Image
                                        src={image.image}
                                        alt={''}
                                        width={200}
                                        height={200}
                                        placeholder={'blur'}
                                        blurDataURL={image.blurImage}
                                        priority
                                    />
                                </div>
                            ))}
                    </Flex>
                </div>
            </div>
            {/* Блок связанных товаров */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
                <div className="bg-white p-4 rounded-md">
                    <Title level={4} className="mb-4">
                        Связанные товары
                    </Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.relatedProducts.map((relatedProduct) => (
                            <Link
                                key={relatedProduct.id}
                                href={`${paths.productsAdmin}/${relatedProduct.id}`}
                                className="hover:bg-gray-50 transition-colors p-3 rounded border"
                            >
                                <Flex align="center" gap={12}>
                                    {relatedProduct.image && (
                                        <Image
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            width={80}
                                            height={80}
                                            className="rounded-md object-cover"
                                        />
                                    )}
                                    <Flex vertical>
                                        <Text strong>
                                            {relatedProduct.name}
                                        </Text>
                                        <Flex gap={8} align="center">
                                            <Tag
                                                color={
                                                    relationTypeToColor[
                                                        relatedProduct.type
                                                    ]
                                                }
                                            >
                                                {
                                                    relationTypeToName[
                                                        relatedProduct.type
                                                    ]
                                                }
                                            </Tag>
                                            <Text type="secondary">
                                                {relatedProduct.price}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </Flex>
    );
};
