'use client';

import { Layout, Menu } from 'antd';
import {
    FileOutlined,
    FolderOpenOutlined,
    ProductOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
    {
        key: '1',
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
    return (
        <Sider width={273}>
            <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                items={menuItems}
            />
        </Sider>
    );
};
