import { FC } from 'react';
import { Flex } from 'antd';
import { Product, ProductRelationsList } from '@/entities/products';
import Image from 'next/image';
import { TextDecor } from '@/shared/ui/TextDecor';
import { Text } from '@/shared/ui/Typography';

type Props = {
    product: Product;
};

export const ProductAdminDetail: FC<Props> = ({ product }) => {
    return (
        <Flex vertical gap={24}>
            {/* Блок основной информации */}
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

            {/* Блок цены */}
            <div className={'bg-white p-2 flex flex-col rounded-md'}>
                <TextDecor name={'Цена'} value={product?.price} />
            </div>

            {/* Блок мета-данных */}
            <div className={'bg-white p-2 flex flex-col rounded-md'}>
                <TextDecor name={'Meta-Title'} value={product?.metaTitle} />
                <TextDecor
                    name={'Meta-Description'}
                    value={product?.metaDescription}
                />
            </div>

            {/* Блок описания */}
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

            {/* Блок дополнительных изображений */}
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
                                        blurDataURL={image?.blurImage ?? ''}
                                        priority
                                    />
                                </div>
                            ))}
                    </Flex>
                </div>
            </div>

            {/* Блок связанных товаров */}
            <ProductRelationsList relations={product?.relatedProducts} />
        </Flex>
    );
};
