'use client';

import { FC, MouseEvent } from 'react';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';
import { productDeleteAdminModel } from '@/entities/products/model';

type Props = {
    id: string;
};

export const DeleteProduct: FC<Props> = ({ id }) => {
    const [submit, loading, currentId] = useUnit([
        productDeleteAdminModel.submitDelete,
        productDeleteAdminModel.$pending,
        productDeleteAdminModel.$currentId,
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
