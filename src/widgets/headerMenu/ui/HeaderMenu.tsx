'use client';

import React, { CSSProperties, useState } from 'react';
import { Button, Menu, type MenuProps } from 'antd';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

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

const burgerIconStyle: CSSProperties = {
    fontSize: 24,
};

type Props = {
    burgerMode?: boolean;
};

export const HeaderMenu = ({ burgerMode }: Props) => {
    const [current, setCurrent] = useState<string[] | undefined>(undefined);
    const [collapsed, setCollapsed] = useState(true);
    const breakpoints = useBreakpoint();
    const isXlScreen = !!breakpoints?.xl;
    const getClassNameForSmoothAppearance = (hidden: boolean): string => `
          absolute transition-all duration-400
          ${hidden ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        `;

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent([e.key]);
    };

    return (
        <div className="flex items-center justify-center">
            {isXlScreen && !burgerMode && (
                <Menu
                    onClick={onClick}
                    selectedKeys={current}
                    mode="horizontal"
                    items={items}
                />
            )}
            {!isXlScreen && burgerMode && (
                <>
                    <Button
                        type="text"
                        shape="circle"
                        size="large"
                        ghost
                        onClick={() => {
                            setCollapsed((prev) => !prev);
                        }}
                        className="hover:!bg-[var(--background)] active:!bg-[var(--background)]"
                    >
                        <MenuOutlined
                            style={burgerIconStyle}
                            className={getClassNameForSmoothAppearance(
                                !collapsed
                            )}
                        />
                        <CloseOutlined
                            style={burgerIconStyle}
                            className={getClassNameForSmoothAppearance(
                                collapsed
                            )}
                        />
                    </Button>
                    {!collapsed && (
                        <Menu
                            onClick={onClick}
                            selectedKeys={current}
                            mode="inline"
                            items={items}
                            className="absolute top-[64px] left-0 w-full"
                        />
                    )}
                </>
            )}
        </div>
    );
};
