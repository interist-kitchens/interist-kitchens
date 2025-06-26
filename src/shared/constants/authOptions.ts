import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/shared/prisma/prisma-client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            id: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Введите почту и пароль');
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });

                    if (!user) throw new Error('Пользователь не найден');
                    if (!user.password) throw new Error('Неверный метод входа');

                    const isValid = await compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValid) throw new Error('Неверный пароль');

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user?.phone,
                        image: user?.image,
                        role: user.role,
                    };
                } catch (error) {
                    console.error('Authorization error:', error);
                    throw new Error('Ошибка авторизации');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                token.phone = user.phone;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    image: token.image,
                    phone: token.phone,
                    role: token.role,
                };
            }
            return session;
        },
    },
    events: {
        async signIn({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { lastLogin: new Date() },
            });
        },
    },
    debug: process.env.NODE_ENV === 'development',
};
