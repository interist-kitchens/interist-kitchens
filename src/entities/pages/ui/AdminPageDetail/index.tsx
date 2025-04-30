import { FC } from 'react';
import { Flex, Typography } from 'antd';
import { Page } from '@prisma/client';
import { dateFormat } from '@/shared/lib';

type Props = {
    page: Page;
};

export const AdminPageDetail: FC<Props> = ({ page }) => {
    return (
        <Flex vertical gap={24}>
            <div className={'flex justify-between bg-white p-2 rounded-md'}>
                <Typography>Алиас: {page?.alias}</Typography>
                <Flex align={'end'} vertical>
                    <Typography>
                        Создан: {dateFormat(page?.createdAt)}
                    </Typography>
                    <Typography>
                        Обновлен: {dateFormat(page?.updatedAt)}
                    </Typography>
                </Flex>
            </div>
            <div className={'bg-white p-2 flex flex-col rounded-md'}>
                <Typography>Meta-Title: {page?.metaTitle}</Typography>
                <Typography>
                    Meta-Description: {page?.metaDescription}
                </Typography>
            </div>
            <div>
                <Typography className={'mb-1'}>Описание</Typography>
                {page?.text && (
                    <div
                        className={'rounded-md p-2 bg-white'}
                        dangerouslySetInnerHTML={{ __html: page?.text }}
                    />
                )}
            </div>
        </Flex>
    );
};
