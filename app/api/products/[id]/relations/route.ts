import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { $Enums } from '@prisma/client';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const { relatedProductId, type } = await request.json();
        const productId = Number(params.id);

        if (!Object.values($Enums.ProductRelationType).includes(type)) {
            return NextResponse.json(
                { error: 'Invalid relation type' },
                { status: 400 }
            );
        }

        const existingRelation = await prisma.relatedProducts.findFirst({
            where: {
                fromProductId: productId,
                toProductId: relatedProductId,
                type,
            },
        });

        if (existingRelation) {
            return NextResponse.json(
                { error: 'This relation already exists' },
                { status: 400 }
            );
        }

        const relation = await prisma.relatedProducts.create({
            data: {
                type,
                fromProductId: productId,
                toProductId: relatedProductId,
            },
        });

        return NextResponse.json(relation);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const { relatedProductId, type } = await request.json();
        const productId = Number(params.id);

        await prisma.relatedProducts.deleteMany({
            where: {
                fromProductId: productId,
                toProductId: relatedProductId,
                type,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
