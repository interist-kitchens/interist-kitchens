import { MainLayout } from '@/widgets/layouts';
import { NextPage } from 'next';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { paths } from '@/shared/routing';
import { Title } from '@/shared/ui/Typography';
import { CartBlock } from '@/widgets/cart';
import Link from 'next/link';

export const Cart: NextPage = () => {
    return (
        <MainLayout>
            <section className={'container mx-auto'}>
                <div className={'p-6'}>
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: <Link href={paths.home}>Главная</Link> },
                            { title: 'Корзина' },
                        ]}
                    />
                </div>
                <div className={'p-6 bg-white rounded'}>
                    <Title level={1}>Ваша корзина покупок</Title>
                    <CartBlock />
                </div>
            </section>
        </MainLayout>
    );
};
