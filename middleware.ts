import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith('/admin')) {
            if (req.nextauth.token?.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/403', req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/login',
            error: '/auth/error',
        },
    }
);

export const config = {
    matcher: [
        '/api/categories/:path',
        '/api/products/:path',
        '/admin/:path*',
        '/profile',
        '/profile/edit',
    ],
};
