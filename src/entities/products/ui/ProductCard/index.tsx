import { FC } from 'react';
import { Text, Title } from '@/shared/ui/Typography';

import parse from 'html-react-parser';

type Props = {
    name: string;
    text: string;
    price: string;
};

export const ProductCard: FC<Props> = async ({ name, text, price }) => {
    return (
        <div className={'flex flex-col bg-white px-5 py-4 w-1/3'}>
            <Title>{name}</Title>
            <Text>{parse(text)}</Text>
            <div className={'text-4xl font-bold'}>{`от ${Intl.NumberFormat(
                'ru-RU',
                {
                    style: 'currency',
                    currency: 'RUB',
                    maximumFractionDigits: 0,
                }
            ).format(parseInt(price))} `}</div>
            <div className={'text-gray-400'}>за погонный метр</div>
        </div>
    );
};
