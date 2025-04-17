import { FC } from 'react';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';

type Props = {
    name: string;
    text: string | null;
    price: string;
};

export const ProductCard: FC<Props> = ({ name, text, price }) => {
    return (
        <Flex vertical className={'bg-gray-500 px-10 py-8 w-1/3'} gap={24}>
            <Title>{name}</Title>
            <div dangerouslySetInnerHTML={{ __html: text ?? '' }} />
            <div>{`от ${Intl.NumberFormat('ru-RU').format(parseInt(price))} `}</div>
        </Flex>
    );
};
