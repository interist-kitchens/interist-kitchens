import { FC } from 'react';
import { Categories } from '@/entities/categories';
import Image from 'next/image';
import { Title } from '@/shared/ui/Typography';
import { Typography } from 'antd';
import { LinkButton } from '@/widgets/mainPageSlider/ui/LinkButton';
import { paths } from '@/shared/routing';
import parse from 'html-react-parser';

type Props = {
    category: Categories;
    variant?: 'normal' | 'reverse';
};

export const CatalogItem: FC<Props> = ({ category, variant = 'normal' }) => {
    return (
        <div className={'grid grid-cols-1 lg:grid-cols-6 items-center gap-8'}>
            {category.image && (
                <Image
                    src={category.image}
                    alt={category.name}
                    width={1200}
                    height={563}
                    className={'lg:col-span-4'}
                />
            )}
            <div
                className={`px-10 lg:px-14 lg:col-span-2 ${variant === 'normal' ? 'lg:order-1' : 'lg:-order-1'}`}
            >
                <Title level={2}>{category.name}</Title>
                {category.text && (
                    <Typography className={'mb-10'}>
                        {parse(category.text)}
                    </Typography>
                )}
                <LinkButton href={`${paths.catalog}/${category.alias}`}>
                    Показать все
                </LinkButton>
            </div>
        </div>
    );
};
