'use client';

import { FC, PropsWithChildren } from 'react';
import { EffectorNext } from '@effector/next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { ModalManager } from '@/shared/ui/ModalManager/ui/ModalManager';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <EffectorNext>
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
                    <SessionProvider>
                        {children}
                        <ModalManager />
                    </SessionProvider>
                </ConfigProvider>
            </AntdRegistry>
        </EffectorNext>
    );
};
