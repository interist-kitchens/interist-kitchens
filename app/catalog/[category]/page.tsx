import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { notFound } from 'next/navigation';
import { categoryListModel } from '@/entities/categories';
import { CategoryListPage } from '@/page-content/categories';

export async function generateMetadata(
    props: {
        params: Promise<{ category: string }>;
    }
) {
    const params = await props.params;
    const scope = fork();

    await allSettled(categoryListModel.categoryListPage.open, {
        scope,
        params,
    });

    const category = scope.getState(categoryListModel.$currentCategory);

    return {
        title: category?.metaTitle?.length
            ? category?.metaTitle
            : `${category?.name} на заказ по низким ценам`,
        description: category?.metaDescription?.length
            ? category?.metaDescription
            : `Компания QКухни предлагает купить кухню от производителя, на заказ. С каталогом выполненных работ вы можете ознакомиться на сайте`,
    };
}

export async function generateStaticParams() {
    const scope = fork();

    await allSettled(categoryListModel.categoryListViewStarted, { scope });

    const categories = scope.getState(categoryListModel.$categories);

    return categories.map((category) => ({
        category: category.alias,
    }));
}

export default async function Page(
    props: {
        params: Promise<{ category: string }>;
    }
) {
    const params = await props.params;
    const scope = fork();

    await allSettled(categoryListModel.categoryListPage.open, {
        scope,
        params,
    });

    const values = serialize(scope);

    const category = scope.getState(categoryListModel.$currentCategory);

    if (!category) {
        notFound();
    }

    return (
        <EffectorNext values={values}>
            <CategoryListPage category={category} />
        </EffectorNext>
    );
}
