import { FC, ReactNode } from 'react';
import { Text, Title } from '@/shared/ui/Typography';

import parse from 'html-react-parser';

type Props = {
    name: string;
    text: string;
    price: string;
    buttonsSlot?: ReactNode;
    attributes?: {
        id: number;
        value: string;
        isPublic: boolean;
        attribute: {
            name: string;
            slug: string;
        };
    }[];
};

export const ProductCard: FC<Props> = async ({
    name,
    text,
    price,
    buttonsSlot,
    attributes = [],
}) => {
    const publicAttributes = attributes.filter((attr) => attr.isPublic);

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

            {/* Вывод атрибутов */}
            <Title level={4}>Характеристики</Title>
            <table className="w-full border-collapse">
                <tbody>
                    {publicAttributes.map((attr) => (
                        <tr key={attr.id} className="border-b border-gray-100">
                            <td className="py-2 font-medium text-gray-600">
                                {attr.attribute.name}
                            </td>
                            <td className="py-2 text-gray-800">{attr.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {buttonsSlot}
        </div>
    );
};
