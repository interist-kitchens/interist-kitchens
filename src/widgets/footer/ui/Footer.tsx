import { FC, Suspense } from 'react';
import { Footer as FooterLayout } from '@/shared/ui/Layout';
import dayjs from 'dayjs';
import { Flex, Spin, Typography } from 'antd';
import { AboutCompany } from '@/widgets/footer/ui/AboutCompany';
import { FooterMenu } from '@/widgets/footer/ui/FooterMenu';
import { FooterCatalogMenu } from '@/widgets/footer/ui/FooterCatalogMenu';

export const Footer: FC = () => {
    return (
        <FooterLayout>
            <Flex vertical className={'w-full'}>
                <div className={'grid md:grid-cols-2 justify-center gap-y-10'}>
                    <AboutCompany />
                    <div className={'flex -order-1 md:order-2 justify-end'}>
                        <Suspense fallback={<Spin />}>
                            <FooterCatalogMenu />
                        </Suspense>
                        <FooterMenu />
                    </div>
                </div>
                <Typography
                    className={'mt-4 text-center sm:text-left'}
                >{`© ${dayjs().year()} Все права защищены. ООО «Interest Mebel».`}</Typography>
            </Flex>
        </FooterLayout>
    );
};
