import { Page } from '@prisma/client';
import { NextPage } from 'next';
import { MainLayout } from '@/widgets/layouts';
import { paths } from '@/shared/routing';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Title } from '@/shared/ui/Typography';
import parse from 'html-react-parser';

type Props = {
    page: Page;
};

export const StaticPage: NextPage<Props> = ({ page }) => {
    return (
        <MainLayout>
            <div
                className={
                    'container mx-auto px-6 pt-5 pb-16 flex flex-col gap-y-6'
                }
            >
                <Breadcrumbs
                    breadcrumbs={[
                        { title: <a href={paths.home}>Главная</a> },
                        { title: page.name },
                    ]}
                />
                <div className={'p-6 bg-white rounded'}>
                    <Title level={1}>{page.name}</Title>
                    <div>{parse(page.text)}</div>
                </div>
            </div>
        </MainLayout>
    );
};
