import React, { FC } from 'react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { paths } from '@/shared/routing';
import { getCategories } from '@/entities/categories';

type MenuItem = Required<MenuProps>['items'][number];

export const FooterCatalogMenu: FC = async () => {
    const categories = await getCategories();

    const items: MenuItem[] =
        categories?.map((item) => ({
            label: (
                <Link href={`${paths.catalog}/${item.alias}`}>{item.name}</Link>
            ),
            key: item.id,
        })) ?? [];

    return <Menu mode="vertical" items={items} />;
};
