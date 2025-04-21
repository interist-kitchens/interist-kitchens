import { FC } from 'react';
import Image from 'next/image';
import image from '@/app/assets/callback-form/1-d-1x.webp';
import { Title } from '@/shared/ui/Typography';

export const CallbackForm: FC = () => {
    return (
        <div
            className={
                'flex py-16 border-y border-gray-300 items-center container mx-auto'
            }
        >
            <div>
                <Image src={image} alt={''} width={921} height={560} />
            </div>
            <div className={'px-20'}>
                <Title level={2}>Нужна консультация дизайнера?</Title>
            </div>
        </div>
    );
};
