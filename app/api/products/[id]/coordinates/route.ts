import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { revalidateTag } from 'next/cache';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const coordinate = await prisma.productCoordinates.create({
            data: {
                productId: Number(params.id),
                x: body.x,
                y: body.y,
                relatedProductId: body?.relatedProductId,
            },
        });

        revalidateTag('products');

        return NextResponse.json(coordinate);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { coordinateId } = await request.json();
        await prisma.productCoordinates.delete({
            where: { id: coordinateId },
        });

        revalidateTag('products');

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
