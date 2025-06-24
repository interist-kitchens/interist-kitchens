'use client';

import React, { CSSProperties, useState } from 'react';
import { Button, Menu, type MenuProps } from 'antd';
import { paths } from '@/shared/routing';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { CallBackButton } from '@/features/leads/callBack/ui/CallBackButton';
import { PhoneLink } from '@/shared/ui/PhoneLink';
import { useMenuKeyFromPath } from '@/widgets/headerMenu/hooks/useMenuKeyFromPath';
import { MENU_KEYS } from '@/widgets/headerMenu/constants';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];
const menuItemClassName = 'font-bold';

const items: MenuItem[] = [
    {
        label: <Link href={paths.catalog}>Каталог</Link>,
        key: MENU_KEYS.catalog,
        className: menuItemClassName,
    },
    {
        label: 'Покупателям',
        key: 'user-info',
        className: menuItemClassName,
        children: [
            {
                label: (
                    <Link href={`/pages/${paths.montage}`}>
                        Сборка и монтаж
                    </Link>
                ),
                key: MENU_KEYS.montage,
            },
            {
                label: (
                    <Link href={`/pages/${paths.delivery}`}>
                        Доставка и оплата
                    </Link>
                ),
                key: MENU_KEYS.delivery,
            },
            {
                label: (
                    <Link href={`/pages/${paths.conditionsMontage}`}>
                        Условия монтажа
                    </Link>
                ),
                key: MENU_KEYS.conditionsMontage,
            },
            {
                label: <Link href={`/pages/${paths.warranty}`}>Гарантия</Link>,
                key: MENU_KEYS.warranty,
            },
        ],
    },
    {
        label: <Link href={`/pages/${paths.contacts}`}>Контакты</Link>,
        key: MENU_KEYS.contacts,
        className: menuItemClassName,
    },
    {
        label: <CallBackButton />,
        key: MENU_KEYS.callBackButton,
        disabled: true,
        className:
            'flex justify-center items-center md:!hidden !py-[24px] !cursor-auto',
    },
];

const burgerIconStyle: CSSProperties = {
    fontSize: 24,
};

type Props = {
    burgerMode?: boolean;
    phone?: string;
};

export const HeaderMenu = ({ burgerMode, phone }: Props) => {
    const [current, setCurrent] = useState<string[] | undefined>(undefined);
    const [collapsed, setCollapsed] = useState(true);
    const breakpoints = useBreakpoint(true);
    const isXlScreen = !!breakpoints?.xl;
    const getClassNameForSmoothAppearance = (hidden: boolean): string => `
          absolute transition-all duration-400
          ${hidden ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        `;

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent([e.key]);
    };

    useMenuKeyFromPath(setCurrent);

    const adaptiveItems = phone
        ? [
              ...items,
              {
                  label: <PhoneLink phone={phone} withBorder />,
                  key: MENU_KEYS.phone,
                  className:
                      'flex justify-center items-center md:!hidden !py-[24px] hover:!bg-[var(--background)] active:!bg-[var(--background)]',
              },
          ]
        : items;

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
                            items={adaptiveItems}
                            className="absolute top-[64px] left-0 w-full"
                        />
                    )}
                </>
            )}
        </div>
    );
};
