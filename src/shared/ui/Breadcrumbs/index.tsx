import { Breadcrumb } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { FC } from 'react';

type Props = {
    breadcrumbs: Partial<BreadcrumbItemType>[];
};

export const Breadcrumbs: FC<Props> = ({ breadcrumbs }) => {
    return <Breadcrumb items={breadcrumbs} />;
};
