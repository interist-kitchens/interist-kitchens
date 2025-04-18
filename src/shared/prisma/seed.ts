import { prisma } from './prisma-client';

async function main() {
    const modernKitchens = await prisma.category.upsert({
        where: {
            alias: 'sovremennye-kuhni',
        },
        update: {},
        create: {
            id: 1,
            name: 'Современные кухни',
            metaTitle: 'Современные кухни под заказ с доставкой по России',
            metaDescription:
                'Купить современные кухни под заказ по выгодным ценам и доставкой по России',
            alias: 'sovremennye-kuhni',
            image: 'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/2_d-JJipoj5RziwESbwnEuVhaKkLL4F7lp.webp',
        },
    });
    const romeKitchen = await prisma.product.upsert({
        where: {
            alias: 'rome-kitchen',
        },
        update: {},
        create: {
            name: 'Rome',
            categoryId: 1,
            alias: 'rome',
            price: '67000',
            metaTitle: 'Современная кухня Rome',
            metaDescription:
                'Купить современные кухни Rome под заказ по выгодным ценам и доставкой по России',
            image: 'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/Rome_01_1730x1152_min-AxkgEiUD9lzBEW335USIXvdadSuqVt.webp',
        },
    });
    const tssKitchen = await prisma.product.upsert({
        where: {
            alias: 'rome-kitchen',
        },
        update: {},
        create: {
            name: 'Кухня Flag TSS',
            categoryId: 1,
            price: '62000',
            alias: 'kuhnya-flag-tss',
            metaTitle: 'Кухня Flag TSS',
            metaDescription:
                'Купить современные кухни Flag TSS под заказ по выгодным ценам и доставкой по России',
            image: 'https://0cu49g0vululgtgg.public.blob.vercel-storage.com/public/Flag_TSS_01_1730x1152_min-AkHCGgE9m4wga2ETvkAmC3fhccyDcg.webp',
        },
    });
    console.log({ modernKitchens, romeKitchen, tssKitchen });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
