import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/shared/prisma/prisma-client';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
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
                    placeholder: 'example@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Введите почту и пароль');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });

                if (!user || !user?.password) {
                    throw new Error('Пользователь не найден');
                }

                const passwordMatch = await compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error('Не верный пароль');
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            if (!token.email) {
                return token;
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }

            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                },
            };
        },
    },
};
