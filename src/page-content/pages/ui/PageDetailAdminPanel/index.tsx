import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { PageAdminLayout } from '@/widgets/layouts';
import { Page } from '@prisma/client';
import { AdminPageDetail } from '@/entities/pages';
import { paths } from '@/shared/routing';

type Props = {
    page: Page;
};

export const PageDetailAdminPanel: NextPage<Props> = ({ page }) => {
    return (
        <PageAdminLayout
            titleSlot={
                <Flex align={'center'} justify={'space-between'}>
                    <Title>{page?.name}</Title>
                    <Link href={`${paths.pageAdmin}/${page?.alias}/edit`}>
                        Редактировать
                    </Link>
                </Flex>
            }
        >
            <AdminPageDetail page={page} />
        </PageAdminLayout>
    );
};
