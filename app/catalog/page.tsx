import { Categories, getCategories } from '@/entities/categories';
import { allSettled, fork, serialize } from 'effector';
import { EffectorNext } from '@effector/next';
import { CatalogPage } from '@/page-content/categories';
import { catalogModel } from '@/entities/categories/model/catalogModel';
import { generateBlurImg } from '@/shared/lib/generateBlurImg';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Каталог кухонь от производителя QКухни',
    description:
        'Компания QКухни предлагает купить кухню на заказ от производителя.',
};

async function preload(): Promise<Categories[]> {
    'use server';

    const categories = await getCategories();
    const categoriesWithBlurImage: Categories[] = categories
        ? await Promise.all(
              categories?.map(async (category) => {
                  const imageBlur = category.image
                      ? await generateBlurImg(category.image)
                      : null;

                  return {
                      ...category,
                      imageBlur,
                  };
              })
          )
        : [];

    return categoriesWithBlurImage;
}

export default async function Page() {
    const scope = fork();

    const categories = await preload();

    await allSettled(catalogModel.catalogPage.open, {
        scope,
    });

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <CatalogPage categories={categories} />
        </EffectorNext>
    );
}
