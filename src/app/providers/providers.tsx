'use client';

import { FC, PropsWithChildren } from 'react';
import { EffectorNext } from '@effector/next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { ModalManager } from '@/shared/ui/ModalManager/ui/ModalManager';
import { cartModel } from '@/entities/leads/model';
import { initializeMultiSsrPersist } from '@/shared/lib/ssrPersist';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    const { values } = initializeMultiSsrPersist({
        stores: [
            {
                store: cartModel.$cart,
                key: 'cart',
                defaultValue: [],
            },
        ],
    });

    return (
        <EffectorNext values={values}>
            <AntdRegistry>
                <ConfigProvider
                    theme={{
                        token: {
                            fontSize: 16,
                            colorPrimary: '#5e94b9',
                            colorInfo: '#5e94b9',
                            borderRadius: 8,
                        },
                    }}
                >
                    {children}
                    <ModalManager />
                </ConfigProvider>
            </AntdRegistry>
        </EffectorNext>
    );
};
