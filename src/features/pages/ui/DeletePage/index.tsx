'use client';

import { FC, MouseEvent } from 'react';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';
import { pageDeleteModel } from '@/entities/pages/model/pageDeleteAdminModel';

type Props = {
    id: number;
};

export const DeletePage: FC<Props> = ({ id }) => {
    const [submit, loading, currentId] = useUnit([
        pageDeleteModel.submitDelete,
        pageDeleteModel.$pending,
        pageDeleteModel.$currentId,
    ]);

    const handleDelete = (e: MouseEvent) => {
        e.stopPropagation();

        submit(id);
    };

    return (
        <Tooltip title="Удалить">
            <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={(e) => handleDelete(e)}
                loading={currentId === id && loading}
            />
        </Tooltip>
    );
};
