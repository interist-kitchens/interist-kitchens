'use client';

import { Layout, Menu } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { menuItems } from '@/widgets/sidebarAdmin/config/constants';

const { Sider } = Layout;

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
