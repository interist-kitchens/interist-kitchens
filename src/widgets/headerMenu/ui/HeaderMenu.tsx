'use client';

import React, { useState } from 'react';
import { Menu, type MenuProps } from 'antd';
import Link from 'next/link';
import { paths } from '@/shared/routing';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link href={paths.catalog}>Каталог</Link>,
        key: 'catalog',
        className: 'font-bold',
    },
    {
        label: 'Покупателям',
        key: 'user-info',
        className: 'font-bold',
        children: [
            {
                label: (
                    <Link href={`/pages/${paths.montage}`}>
                        Сборка и монтаж
                    </Link>
                ),
                key: 'montage',
            },
            {
                label: (
                    <Link href={`/pages/${paths.delivery}`}>
                        Доставка и оплата
                    </Link>
                ),
                key: 'delivery',
            },
            {
                label: (
                    <Link href={`/pages/${paths.conditionsMontage}`}>
                        Условия монтажа
                    </Link>
                ),
                key: 'conditionsMontage',
            },
            {
                label: <Link href={`/pages/${paths.warranty}`}>Гарантия</Link>,
                key: 'warranty',
            },
        ],
    },
    {
        label: 'Акции',
        key: 'sales',
        className: 'font-bold',
    },
    {
        label: <Link href={`/pages/${paths.contacts}`}>Контакты</Link>,
        key: 'contacts',
        className: 'font-bold',
    },
];

export const HeaderMenu = () => {
    const [current, setCurrent] = useState<string[] | undefined>(undefined);

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent([e.key]);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={current}
            mode="horizontal"
            items={items}
        />
    );
};
