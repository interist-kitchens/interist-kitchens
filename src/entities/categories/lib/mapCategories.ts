import { Categories, CategoriesResponse } from '@/entities/categories';
import { dateFormat } from '@/shared/lib';
import { generateBlurImg } from '@/shared/lib/generateBlurImg';

export const mapCategories = (
    res: CategoriesResponse[]
): Promise<Categories[]> => {
    return Promise.all(
        res.map(async (category) => ({
            ...category,
            id: String(category.id),
            createdAt: dateFormat(category.createdAt),
            updatedAt: dateFormat(category.updatedAt),
            products: category?.products
                ? await Promise.all(
                      category.products.map(async (product) => ({
                          id: product.id,
                          name: product.name,
                          image: product.image,
                          imageBlur: await generateBlurImg(product.image),
                          alias: product.alias,
                          price: product.price,
                      }))
                  )
                : [],
        }))
    );
};
