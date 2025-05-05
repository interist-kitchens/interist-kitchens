import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { notFound } from 'next/navigation';
import { pageDetailAdminModel } from '@/entities/pages';
import { StaticPage } from '@/page-content/pages';

export async function generateMetadata({
    params,
}: {
    params: { alias: string };
}) {
    const scope = fork();

    await allSettled(pageDetailAdminModel.staticPage.open, { scope, params });

    const pageData = scope.getState(pageDetailAdminModel.$currentPage);

    return {
        title: pageData?.metaTitle?.length
            ? pageData?.metaTitle
            : `${pageData?.name}`,
        description: pageData?.metaDescription?.length
            ? pageData?.metaDescription
            : `Компания QКухни предлагает ознакомится с информацией - ${pageData?.name}`,
    };
}

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(pageDetailAdminModel.pageViewStarted, { scope });

    const pages = scope.getState(pageDetailAdminModel.$pages);

    return pages.map((page) => ({
        alias: page.alias,
    }));
}

export default async function Page({ params }: { params: { alias: string } }) {
    const scope = fork();

    await allSettled(pageDetailAdminModel.staticPage.open, { scope, params });

    const values = serialize(scope);

    const pageData = scope.getState(pageDetailAdminModel.$currentPage);

    if (!pageData) {
        notFound();
    }

    return (
        <EffectorNext values={values}>
            <StaticPage page={pageData} />
        </EffectorNext>
    );
}
