import React, { FC } from 'react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { paths } from '@/shared/routing';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link href={paths.catalog}>Каталог</Link>,
        key: 'catalog',
    },
    {
        label: <Link href={'#'}>Покупателям</Link>,
        key: 'user-info',
    },
    {
        label: <Link href={'#'}>Акции</Link>,
        key: 'sales',
    },
    {
        label: <Link href={'#'}>Адреса студий</Link>,
        key: 'adresses',
    },
];

export const FooterMenu: FC = () => {
    return <Menu mode="vertical" items={items} />;
};
