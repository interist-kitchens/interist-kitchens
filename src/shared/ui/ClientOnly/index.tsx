import { useEffect, useState } from 'react';
import { Spin } from 'antd';

// Компонент ClientOnly используется для того, чтобы избажать ошибки
// "Hydration failed because the initial UI does not match what was rendered on the server"
export default function ClientOnly({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <Spin size="small" />;

    return <>{children}</>;
}
