'use client';

import Link from 'next/link';

export const LoginButton = () => (
    <Link
        type="button"
        href="login"
        className="ant-btn css-dev-only-do-not-override-hn3hpa ant-btn-default ant-btn-color-default ant-btn-variant-outlined"
    >
        Войти
    </Link>
);
