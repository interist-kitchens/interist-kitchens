import { FC, ReactNode } from 'react';
import { Text, Title } from '@/shared/ui/Typography';

import parse from 'html-react-parser';

type Props = {
    name: string;
    text: string;
    price: string;
    buttonsSlot?: ReactNode;
};

export const ProductCard: FC<Props> = async ({
    name,
    text,
    price,
    buttonsSlot,
}) => {
    return (
        <div
            className={
                'flex flex-col bg-white px-5 py-4 w-full lg:w-4/12 gap-y-4 rounded-lg shadow-lg'
            }
        >
            <Title style={{ marginBottom: 0 }}>{name}</Title>
            <Text>{parse(text)}</Text>
            <div>
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
            {buttonsSlot}
        </div>
    );
};
