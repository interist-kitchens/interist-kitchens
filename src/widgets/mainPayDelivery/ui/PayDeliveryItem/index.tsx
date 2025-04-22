import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { Typography } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    title: string;
    description: string;
    link?: string;
    images?: string[];
};

export const PayDeliveryItem: FC<Props> = ({
    title,
    link,
    images,
    description,
}) => {
    return (
        <div className={'p-10 bg-white flex flex-col'}>
            <Title level={3}>{title}</Title>
            <Typography className={'mb-5'}>{description}</Typography>
            {link && (
                <Link className={'mb-5'} href={link}>
                    Подробнее об услуге
                </Link>
            )}
            <div className={'flex flex-wrap-reverse mt-auto gap-2'}>
                {images?.map((image) => (
                    <div
                        key={image}
                        className={
                            'rounded border border-gray-300 w-[110px] h-[54px] flex items-center justify-center'
                        }
                    >
                        <Image src={image} alt={''} />
                    </div>
                ))}
            </div>
        </div>
    );
};
