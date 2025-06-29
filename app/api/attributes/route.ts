import { NextResponse } from 'next/server';
import { prisma } from '@/shared/prisma/prisma-client';
import { transliterateToSlug } from '@/shared/lib';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;

        // Проверка на уникальность имени
        const existingAttribute = await prisma.productAttribute.findFirst({
            where: { name },
        });

        if (existingAttribute) {
            return NextResponse.json(
                { error: 'Атрибут с таким названием уже существует' },
                { status: 400 }
            );
        }

        const slug = transliterateToSlug(name);

        const attribute = await prisma.productAttribute.create({
            data: { name, slug },
        });

        revalidateTag('attributes');

        return NextResponse.json(attribute);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to create attribute ${error}` },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    await prisma.productAttribute.delete({
        where: { id: parseInt(id) },
    });

    revalidateTag('attributes');

    return NextResponse.json({ success: true });
}
