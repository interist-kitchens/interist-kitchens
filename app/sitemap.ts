import { MetadataRoute } from 'next';
import { getCategories } from '@/entities/categories';
import { getProducts } from '@/entities/products';
import { getPages } from '@/entities/pages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemap = await Promise.all([
        await getCategories(),
        await getProducts(),
        await getPages(),
    ]);

    return [
        ...(sitemap?.[0]?.map((category) => ({
            url: `${process.env.NEXT_PUBLIC_URL}/catalog/${category.alias}`,
            lastModified: category.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 1,
        })) ?? []),
        ...(sitemap?.[1]?.map((product) => ({
            url: `${process.env.NEXT_PUBLIC_URL}/catalog/${product.categories.alias}/${product.alias}`,
            lastModified: product.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 1,
        })) ?? []),
        ...(sitemap?.[2]?.map((page) => ({
            url: `${process.env.NEXT_PUBLIC_URL}/pages/${page.alias}`,
            lastModified: page.updatedAt,
            changeFrequency: 'yearly' as const,
        })) ?? []),
    ];
}
