import { FC } from 'react';
import { Flex, Typography } from 'antd';

export const AboutCompany: FC = () => {
    return (
        <Flex vertical gap={8}>
            <Typography>OOO Кухнику от Кукухни</Typography>
            <Typography>ИНН 1234567890 КПП 1234567890</Typography>
            <Typography>ОГРН 098765432112345</Typography>
        </Flex>
    );
};
