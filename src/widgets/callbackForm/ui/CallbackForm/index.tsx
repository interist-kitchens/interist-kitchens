'use client';

import { FC } from 'react';
import Image from 'next/image';
import image from '@/app/assets/callback-form/1-d-1x.webp';
import { Title } from '@/shared/ui/Typography';
import { OrderProjectForm } from '@/entities/leads';

export const CallbackForm: FC = () => {
    return (
        <div className={'border-y border-gray-300'}>
            <div
                className={
                    'container mx-auto grid lg:grid-cols-2 xl:grid-cols-3 py-16 gap-8'
                }
            >
                <div className={'xl:col-span-2'}>
                    <Image src={image} alt={''} width={921} height={560} />
                </div>
                <div className={'px-5 sm:px-0'}>
                    <Title level={2}>Нужна консультация дизайнера?</Title>
                    <OrderProjectForm />
                </div>
            </div>
        </div>
    );
};
