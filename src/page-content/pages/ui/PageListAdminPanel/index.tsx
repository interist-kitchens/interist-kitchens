import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { Flex } from 'antd';
import Link from 'next/link';
import { Page } from '@prisma/client';
import { AdminPageList } from '@/entities/pages';
import { paths } from '@/shared/routing';

type Props = {
    pages?: Page[];
};

export const PageListAdminPanel: NextPage<Props> = async ({ pages }) => {
    return (
        <>
            <Flex align={'center'} justify={'space-between'}>
                <Title>Страницы</Title>
                <Link href={paths.pageAdminCreate}>Добавить</Link>
            </Flex>
            <AdminPageList pages={pages} />
        </>
    );
};
