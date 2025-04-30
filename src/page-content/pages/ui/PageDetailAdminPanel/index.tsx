import { NextPage } from 'next';
import { Flex } from 'antd';
import { Title } from '@/shared/ui/Typography';
import Link from 'next/link';
import { CategoryAdminLayout } from '@/widgets/layouts';
import { Page } from '@prisma/client';
import { AdminPageDetail } from '@/entities/pages';

type Props = {
    page: Page;
};

export const PageDetailAdminPanel: NextPage<Props> = ({ page }) => {
    return (
        <CategoryAdminLayout
            titleSlot={
                <Flex align={'center'} justify={'space-between'}>
                    <Title>{page?.name}</Title>
                    <Link href={'#'}>Редактировать</Link>
                </Flex>
            }
        >
            <AdminPageDetail page={page} />
        </CategoryAdminLayout>
    );
};
