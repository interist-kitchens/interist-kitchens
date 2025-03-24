'use client';

import React from 'react';
import { Layout as DefaultLayout, theme } from 'antd';

const {
    Header: DefaultHeader,
    Content: DefaultContent,
    Footer: DefaultFooter,
} = DefaultLayout;

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <DefaultLayout className="flex w-screen !min-h-screen">
        {children}
    </DefaultLayout>
);

export const Header: React.FC<React.PropsWithChildren> = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <DefaultHeader
            className="flex justify-between items-center !p-6 sticky top-0 z-[var(--sticky-layer) shadow-sm"
            style={{ background: colorBgContainer }}
        >
            {children}
        </DefaultHeader>
    );
};

export const Content: React.FC<React.PropsWithChildren> = ({ children }) => (
    <DefaultContent className="flex grow p-6 h-full w-full">
        {children}
    </DefaultContent>
);

export const Footer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <DefaultFooter
            className="flex justify-between items-center p-6"
            style={{ background: colorBgContainer }}
        >
            {children}
        </DefaultFooter>
    );
};
