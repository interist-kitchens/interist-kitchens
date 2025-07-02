import { prisma } from '@/shared/prisma/prisma-client';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const { relatedProductId } = await request.json();

        const coordinate = await prisma.productCoordinates.update({
            where: { id: Number(params.id) },
            data: {
                relatedProductId: relatedProductId
                    ? Number(relatedProductId)
                    : null,
            },
            include: {
                relatedProduct: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        revalidateTag('products');

        return NextResponse.json(coordinate);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
