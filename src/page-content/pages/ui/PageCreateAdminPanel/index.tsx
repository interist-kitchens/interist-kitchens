import { NextPage } from 'next';
import { Title } from '@/shared/ui/Typography';
import { PageAdminLayout } from '@/widgets/layouts/pageAdminLayout';
import { AddPageForm } from '@/features/pages';

export const PageCreateAdminPanel: NextPage = async () => {
    return (
        <PageAdminLayout titleSlot={<Title>Добавление страницы</Title>}>
            <AddPageForm />
        </PageAdminLayout>
    );
};
