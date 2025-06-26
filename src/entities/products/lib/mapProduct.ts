import { Product, ProductResponse } from '@/entities/products/api';
import { dateFormat } from '@/shared/lib';
import { generateBlurImg } from '@/shared/lib/generateBlurImg';

export const mapProduct = async (
    res: ProductResponse[]
): Promise<Product[]> => {
    return await Promise.all(
        res.map(async (product) => ({
            ...product,
            id: String(product.id),
            createdAt: dateFormat(product.createdAt),
            updatedAt: dateFormat(product.updatedAt),
            categoryName: product.categories.name,
            text: product.text ?? '',
            imageBlur: await generateBlurImg(product.image),
            images: await Promise.all(
                [product.image, ...product.images].map(async (image) => ({
                    image,
                    blurImage: await generateBlurImg(image),
                }))
            ),
            coordinates: product.coordinates,
        }))
    );
};
