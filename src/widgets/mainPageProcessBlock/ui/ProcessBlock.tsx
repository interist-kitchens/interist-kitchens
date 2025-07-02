import { FC, Fragment } from 'react';
import Image from 'next/image';
import banner from '@/app/assets/1-d-1x.webp';
import { Title } from '@/shared/ui/Typography';
import { Divider, Typography } from 'antd';
import { PROCESS_CONFIG } from '@/widgets/mainPageProcessBlock/config/constants';
import { SendOrderProjectBtn } from '@/features/leads/orderProject';

export const ProcessBlock: FC = () => {
    return (
        <div className={'container mx-auto flex flex-col gap-y-10 sm:gap-y-20'}>
            <div className={'w-full'}>
                <Image
                    src={banner}
                    alt={'Процесс заказа'}
                    height={460}
                    width={1760}
                />
            </div>
            <div
                className={
                    'grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-10 px-10 sm:px-0'
                }
            >
                <div className={'flex flex-col'}>
                    <Title level={2}>Процесс</Title>
                    <Typography className={'mb-4'}>
                        Пять простых этапов в сопровождении персонального
                        дизайнера
                    </Typography>
                    <SendOrderProjectBtn />
                </div>
                <div className={'flex flex-col sm:col-span-2'}>
                    {PROCESS_CONFIG.map((item, index) => (
                        <Fragment key={item.id}>
                            <div className={'flex gap-x-5'}>
                                <div
                                    className={
                                        'text-4xl sm:text-5xl font-bold pl-3'
                                    }
                                >
                                    {String(item.id).padStart(2, '0')}
                                </div>
                                <div className={'flex flex-col'}>
                                    <Title level={3}>{item.title}</Title>
                                    <Typography>{item.description}</Typography>
                                </div>
                            </div>
                            {index !== PROCESS_CONFIG.length - 1 && <Divider />}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
