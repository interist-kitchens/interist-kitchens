import { NextResponse } from 'next/server';
import { CartOrderType } from '@/entities/leads/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/authOptions';
import { prisma } from '@/shared/prisma/prisma-client';
import nodemailer from 'nodemailer';
import { cartOrderTemplate } from '@/shared/mail/cartOrder';

export async function POST(request: Request) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const data = (await request.json()) as CartOrderType;
        const session = await getServerSession(authOptions);

        const order = await prisma.order.create({
            data: {
                name: data?.delivery?.name,
                email: data?.delivery?.email,
                phone: data?.delivery?.phone,
                address: data?.delivery?.address,
                userId: session?.user?.id,
                items: {
                    create: data?.products.map((product) => ({
                        productId: parseInt(product?.product.id),
                        quantity: product?.count,
                        priceAtOrder: product?.product.price,
                    })),
                },
            },
        });

        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_YANDEX_SMTP_HOST,
            secure: true,
            port: 465,
            auth: {
                user: process.env.NEXT_PUBLIC_YANDEX_SMTP_USER,
                pass: process.env.NEXT_PUBLIC_YANDEX_SMTP_PASS,
            },
        });

        const messageForShop = {
            from: process.env.NEXT_PUBLIC_SITE_EMAIL,
            to: process.env.NEXT_PUBLIC_SITE_EMAIL,
            subject: 'Заказ',
            html: cartOrderTemplate(data, order.id),
        };

        await transporter.sendMail(messageForShop);

        const messageForUser = {
            from: process.env.NEXT_PUBLIC_SITE_EMAIL,
            to: data?.delivery?.email,
            subject: 'Заказ c сайта Interist Kitchens',
            html: cartOrderTemplate(data, order.id),
        };

        await transporter.sendMail(messageForUser);

        return NextResponse.json(
            { status: 'success send', order },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
