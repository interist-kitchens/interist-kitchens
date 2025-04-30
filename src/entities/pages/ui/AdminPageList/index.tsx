'use client';

import { FC, useEffect } from 'react';
import { Page } from '@prisma/client';
import { message, Table, TableProps } from 'antd';
import { dateFormat } from '@/shared/lib';
import { DeletePage } from '@/features/pages';
import { useRouter } from 'next/navigation';
import { useUnit } from 'effector-react';
import { pageDeleteModel } from '@/entities/pages';
import { paths, protectedRoutes } from '@/shared/routing';

type Props = {
    pages?: Page[];
};

interface DataType {
    key: number;
    name: string;
    alias: string;
    createdAt: Date;
    updatedAt: Date;
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
        render: (value) => dateFormat(value),
    },
    {
        title: 'Обновлено',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (value) => dateFormat(value),
    },
    {
        title: '',
        dataIndex: 'deleteAction',
        key: 'deleteAction',
        render: (_, record) =>
            protectedRoutes.includes(record.alias) ? null : (
                <DeletePage id={record.key} />
            ),
    },
];

export const AdminPageList: FC<Props> = ({ pages }) => {
    const router = useRouter();

    const [isSuccess, reset] = useUnit([
        pageDeleteModel.$isSuccess,
        pageDeleteModel.reset,
    ]);

    useEffect(() => {
        if (isSuccess) {
            message
                .open({
                    type: 'success',
                    content: 'Страница удалена успешно',
                    duration: 1,
                })
                .then(() => {
                    reset();
                    router.refresh();
                });
        }
    }, [reset, isSuccess, router]);

    useEffect(() => {
        router.refresh();
    }, [router]);

    const data: DataType[] =
        pages?.map((page) => ({
            key: page.id,
            name: page.name,
            alias: page.alias,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
        })) ?? [];

    const handleClickRow = (alias: string) => {
        router.push(`${paths.pageAdmin}/${alias}`);
    };

    return (
        <Table<DataType>
            columns={columns}
            dataSource={data}
            onRow={(record) => {
                return {
                    onClick: () => handleClickRow(record.alias),
                };
            }}
        />
    );
};
