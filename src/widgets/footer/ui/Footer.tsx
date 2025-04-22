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
                <Flex justify={'space-between'}>
                    <AboutCompany />
                    <Flex>
                        <Suspense fallback={<Spin />}>
                            <FooterCatalogMenu />
                        </Suspense>
                        <FooterMenu />
                    </Flex>
                </Flex>
                <Typography
                    className={'mt-4'}
                >{`© ${dayjs().year()} Все права защищены. ООО «Кухнику от Кукухни».`}</Typography>
            </Flex>
        </FooterLayout>
    );
};
