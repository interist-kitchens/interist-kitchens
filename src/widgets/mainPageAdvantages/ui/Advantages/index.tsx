import { FC } from 'react';
import { Title } from '@/shared/ui/Typography';
import { Button, Divider, Typography } from 'antd';
import { ADVANTAGE_CONFIG } from '@/widgets/mainPageAdvantages/config/constants';
import Image from 'next/image';

export const Advantages: FC = () => {
    return (
        <div className={'bg-gray-200'}>
            <div
                className={
                    'container mx-auto px-10 sm:px-0 py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10'
                }
            >
                <div>
                    <Title level={2}>Почему нас выбирают</Title>
                    <Typography>
                        С нами вы сможете с легкостью подобрать идеальную кухню
                        для своего дома, а профессиональные дизайнеры создадут
                        индивидуальный проект, учитывая все пожелания
                    </Typography>
                    <Button type={'primary'} size={'large'} className={'mt-8'}>
                        Заказать проект
                    </Button>
                </div>
                <div className={'flex flex-col'}>
                    {ADVANTAGE_CONFIG.map((item, index) => (
                        <>
                            <div key={item.id} className={'flex gap-x-5'}>
                                <div className={'pl-3'}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={70}
                                        height={70}
                                    />
                                </div>
                                <div className={'flex flex-col'}>
                                    <Title level={3}>{item.title}</Title>
                                    <Typography>{item.description}</Typography>
                                </div>
                            </div>
                            {index !== ADVANTAGE_CONFIG.length - 1 && (
                                <Divider />
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};
