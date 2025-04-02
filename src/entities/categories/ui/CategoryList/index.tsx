import { FC } from 'react';
import { Categories } from '@/entities/categories';
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';

type Props = {
    categories: Categories[];
};

interface DataType {
    key: string;
    name: string;
    alias: string;
    createdAt: string;
    updatedAt: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Алиас',
        dataIndex: 'alias',
        key: 'alias',
    },
    {
        title: 'Создано',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Обновлено',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
];

export const CategoryList: FC<Props> = ({ categories }) => {
    const data: DataType[] = categories.map((category) => ({
        key: category.id,
        name: category.name,
        alias: category.alias,
        createdAt: dayjs(category.createdAt).format('DD.MM.YYYY'),
        updatedAt: dayjs(category.updatedAt).format('DD.MM.YYYY'),
    }));

    return <Table<DataType> columns={columns} dataSource={data} />;
};
