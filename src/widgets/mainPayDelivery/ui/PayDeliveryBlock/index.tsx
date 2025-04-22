import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { PAY_DELIVERY_CONFIG } from '@/widgets/mainPayDelivery/config/constants';
import { PayDeliveryItem } from '@/widgets/mainPayDelivery/ui/PayDeliveryItem';

export const PayDeliveryBlock: FC = () => {
    return (
        <div className={'container mx-auto'}>
            <Title className={'text-center'}>Оплата и доставка</Title>
            <div className={'grid grid-cols-1 lg:grid-cols-3 gap-8'}>
                {PAY_DELIVERY_CONFIG.map((item) => (
                    <PayDeliveryItem
                        key={item.id}
                        title={item.title}
                        link={item.link}
                        images={item.images}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};
