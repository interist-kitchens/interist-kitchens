import { FC } from 'react';
import { Categories } from '@/entities/categories';
import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';

type Props = {
    category: Categories | null;
};

export const CategoryDetail: FC<Props> = ({ category }) => {
    return (
        <Flex vertical gap={24}>
            <div className={'flex justify-between bg-white p-2 rounded-md'}>
                <Typography>Алиас: {category?.alias}</Typography>
                <Flex align={'end'} vertical>
                    <Typography>
                        Создан:{' '}
                        {dayjs(category?.createdAt).format('DD.MM.YYYY')}
                    </Typography>
                    <Typography>
                        Обновлен:{' '}
                        {dayjs(category?.updatedAt).format('DD.MM.YYYY')}
                    </Typography>
                </Flex>
            </div>
            <div className={'w-fit p-4 bg-white ml-auto rounded-md'}>
                {category?.image && (
                    <Image
                        src={category.image}
                        alt={category.name}
                        width={200}
                        height={200}
                        priority
                    />
                )}
            </div>
            <div className={'bg-white p-2 flex flex-col rounded-md'}>
                <Typography>Meta-Title: {category?.metaTitle}</Typography>
                <Typography>
                    Meta-Description: {category?.metaDescription}
                </Typography>
            </div>
            <div>
                <Typography className={'mb-1'}>Описание</Typography>
                {category?.text && (
                    <div
                        className={'rounded-md p-2 bg-white'}
                        dangerouslySetInnerHTML={{ __html: category?.text }}
                    />
                )}
            </div>
        </Flex>
    );
};
