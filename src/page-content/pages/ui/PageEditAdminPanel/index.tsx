import { NextPage } from 'next';
import { PageAdminLayout } from '@/widgets/layouts';
import { Title } from '@/shared/ui/Typography';
import { Page } from '@prisma/client';
import { EditPageForm } from '@/features/pages';

type Props = {
    page: Page;
};

export const PageEditAdminPanel: NextPage<Props> = ({ page }) => {
    return (
        <PageAdminLayout titleSlot={<Title>Редактирование страницы</Title>}>
            <EditPageForm page={page} />
        </PageAdminLayout>
    );
};
