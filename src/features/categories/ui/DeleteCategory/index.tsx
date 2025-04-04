import { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';
import { categoryDeleteModel } from '@/entities/categories';

type Props = {
    id: string;
};

export const DeleteCategory: FC<Props> = ({ id }) => {
    const [submit, loading, currentId] = useUnit([
        categoryDeleteModel.submitDelete,
        categoryDeleteModel.$pending,
        categoryDeleteModel.$currentId,
    ]);

    const handleDelete = () => {
        submit({ id });
    };

    return (
        <Tooltip title="Удалить">
            <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                loading={currentId === id && loading}
            />
        </Tooltip>
    );
};
