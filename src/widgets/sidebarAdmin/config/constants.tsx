import { MenuItemType } from 'antd/es/menu/interface';
import { paths } from '@/shared/routing';
import {
    ApartmentOutlined,
    FileOutlined,
    FolderOpenOutlined,
    PhoneOutlined,
    ProductOutlined,
    ShoppingCartOutlined,
    SlidersOutlined,
} from '@ant-design/icons';

export const menuItems: MenuItemType[] = [
    {
        key: paths.categoriesAdmin,
        icon: <FolderOpenOutlined />,
        label: 'Категории',
    },
    {
        key: paths.productsAdmin,
        icon: <ProductOutlined />,
        label: 'Товары',
    },
    {
        key: paths.attributesAdmin,
        icon: <ApartmentOutlined />,
        label: 'Атрибуты товаров',
    },
    {
        key: paths.pageAdmin,
        icon: <FileOutlined />,
        label: 'Страницы',
    },
    {
        key: paths.sliderAdmin,
        icon: <SlidersOutlined />,
        label: 'Слайдер (основной)',
    },
    {
        key: paths.callbackAdmin,
        icon: <PhoneOutlined />,
        label: 'Обратные звонки',
    },
    {
        key: paths.individualsOrders,
        icon: <PhoneOutlined />,
        label: 'Заказ на индивидуальный расчет',
    },
    {
        key: paths.orderAdmin,
        icon: <ShoppingCartOutlined />,
        label: 'Заказы',
    },
];
