'use client';

import { Layout, Menu } from 'antd';
import {
    FileOutlined,
    FolderOpenOutlined,
    ProductOutlined,
} from '@ant-design/icons';
import { MenuItemType } from 'antd/es/menu/interface';
import { paths } from '@/shared/routing';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Sider } = Layout;

const menuItems: MenuItemType[] = [
    {
        key: paths.categories,
        icon: <FolderOpenOutlined />,
        label: 'Категории',
    },
    {
        key: '2',
        icon: <ProductOutlined />,
        label: 'Товары',
    },
    {
        key: '3',
        icon: <FileOutlined />,
        label: 'Страницы',
    },
];

export const SidebarMenu = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [current, setCurrent] = useState<string[] | undefined>(undefined);

    useEffect(() => {
        setCurrent([`/${pathname.split('/').pop()}`]);
    }, [pathname]);

    const handleSelect = (item: MenuItemType) => {
        if (item) {
            router.push(`${item.key}`);
        }
    };

    return (
        <Sider width={273}>
            <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                items={menuItems}
                onSelect={handleSelect}
                selectedKeys={current}
            />
        </Sider>
    );
};
