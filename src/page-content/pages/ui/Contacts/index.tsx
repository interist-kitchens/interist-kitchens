import { NextPage } from 'next';
import { contactsConfig } from '@/page-content/pages/config';
import { ContactMap } from '@/widgets/contactMap';
import { MainLayout } from '@/widgets/layouts';
import { Title } from '@/shared/ui/Typography';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { paths } from '@/shared/routing';
import Link from 'next/link';

export const Contacts: NextPage = async () => {
    return (
        <MainLayout>
            <section className={'container mx-auto'}>
                <div className={'p-6'}>
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: <Link href={paths.home}>Главная</Link> },
                            { title: 'Контакты' },
                        ]}
                    />
                </div>
                <div className={'p-6 bg-white rounded'}>
                    <Title level={1}>Контакты</Title>
                    <div
                        className={
                            'flex flex-col lg:flex-row container mx-auto mb-20'
                        }
                    >
                        <div
                            className={
                                'lg:basis-[484px] mb-6 lg:mb-0 lg:mr-6 pb-6 lg:pb-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-color6 flex flex-col justify-between'
                            }
                        >
                            <div className={'space-y-4 lg:space-y-6'}>
                                <div className={'space-y-2 lg:space-y-3'}>
                                    <div
                                        className={
                                            'font-involve font-medium text-xl lg:text-[32px] lg:leading-[42px] text-color1'
                                        }
                                    >
                                        {contactsConfig.phone}
                                    </div>
                                </div>
                                <div
                                    className={
                                        'text-lg lg:text-2xl text-color1'
                                    }
                                >
                                    {contactsConfig.address}
                                </div>
                                <div className={'space-y-2 lg:space-y-4'}>
                                    <div
                                        className={
                                            'text-[15px] lg:text-lg text-color1'
                                        }
                                    ></div>
                                    <div
                                        className={
                                            'text-[15px] lg:text-lg text-color1'
                                        }
                                    >
                                        {contactsConfig.time}
                                    </div>
                                </div>
                            </div>
                            <div className={'space-y-6 hidden lg:block'}>
                                <div className={'text-lg text-color1'}>
                                    {contactsConfig.name}
                                </div>
                                <div className={'flex gap-x-8'}>
                                    <div
                                        className={'flex flex-col gap-y-[6px]'}
                                    >
                                        <span className={'text-lg text-color4'}>
                                            ИНН
                                        </span>
                                        <span className={'text-lg text-color1'}>
                                            {contactsConfig.inn}
                                        </span>
                                    </div>
                                    <div
                                        className={'flex flex-col gap-y-[6px]'}
                                    >
                                        <span className={'text-lg text-color4'}>
                                            ОГРН
                                        </span>
                                        <span className={'text-lg text-color1'}>
                                            {contactsConfig.ogrn}
                                        </span>
                                    </div>
                                </div>
                                <div className={'flex flex-col gap-y-[6px]'}>
                                    <span className={'text-lg text-color4'}>
                                        Адрес производства:
                                    </span>
                                    <span className={'text-lg text-color1'}>
                                        {contactsConfig.addressSecond}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ContactMap />
                        </div>
                        <div className={'space-y-6 lg:hidden'}>
                            <div className={'text-lg text-color1'}>
                                {contactsConfig.name}
                            </div>
                            <div className={'flex gap-x-8'}>
                                <div className={'flex flex-col gap-y-[6px]'}>
                                    <span className={'text-[15px] text-color4'}>
                                        ИНН
                                    </span>
                                    <span className={'text-[15px] text-color1'}>
                                        {contactsConfig.inn}
                                    </span>
                                </div>
                                <div className={'flex flex-col gap-y-[6px]'}>
                                    <span className={'text-[15px] text-color4'}>
                                        ОГРН
                                    </span>
                                    <span className={'text-[15px] text-color1'}>
                                        {contactsConfig.ogrn}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};
