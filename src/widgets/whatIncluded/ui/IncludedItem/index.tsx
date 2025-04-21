import { FC } from 'react';
import { Flex, Tooltip, Typography } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { QuestionCircleOutlined } from '@ant-design/icons';

type Props = {
    image: StaticImageData;
    name: string;
    description: string;
};

export const IncludedItem: FC<Props> = ({ image, name, description }) => {
    return (
        <Flex gap={20} align={'center'} justify={'center'}>
            <Image src={image} alt={name} width={70} height={70} />
            <Typography className={'max-w-[130px]'}>
                {name}{' '}
                <Tooltip title={description}>
                    <QuestionCircleOutlined />
                </Tooltip>
            </Typography>
        </Flex>
    );
};
