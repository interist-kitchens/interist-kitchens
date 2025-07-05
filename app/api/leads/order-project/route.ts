import { NextResponse } from 'next/server';
import { OrderProjectFormType } from '@/entities/leads/api';
import nodemailer from 'nodemailer';
import { prisma } from '@/shared/prisma/prisma-client';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'DATABASE_URL is not set' },
            { status: 500 }
        );
    }

    try {
        const formData = (await request.json()) as OrderProjectFormType;

        const order = await prisma.callback.create({
            data: {
                name: formData.name,
                phone: formData.phone,
                email: formData?.mail,
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
            subject: 'Заказ проекта',
            text: `Имя: ${formData.name}. Номер телефона: ${formData.phone}`,
        };

        await transporter.sendMail(messageForShop);

        if (formData.mail) {
            const messageForUser = {
                from: process.env.NEXT_PUBLIC_SITE_EMAIL,
                to: formData.mail,
                subject: 'Заказ звонка c сайта Interist Kitchens',
                text: `С Вами свяжутся в ближайшее время.`,
            };

            await transporter.sendMail(messageForUser);
        }

        revalidateTag('callback-list');

        return NextResponse.json(
            { status: 'success send', order },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
