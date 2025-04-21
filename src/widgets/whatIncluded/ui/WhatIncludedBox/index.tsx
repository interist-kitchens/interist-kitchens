import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { WHAT_INCLUDED_CONFIG } from '@/widgets/whatIncluded/config/constants';
import { IncludedItem } from '@/widgets/whatIncluded/ui/IncludedItem';

export const WhatIncludedBox: FC = () => {
    return (
        <div className={'container mx-auto p-14 bg-white'}>
            <Title level={2} className={'text-2xl'}>
                Что входит в стоимость кухни
            </Title>
            <div
                className={
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between gap-5'
                }
            >
                {WHAT_INCLUDED_CONFIG.map((item) => (
                    <IncludedItem
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};
