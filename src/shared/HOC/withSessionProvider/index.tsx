import { SessionProvider } from 'next-auth/react';
import { ComponentType } from 'react';

export function withSessionProvider<P extends object>(
    WrappedComponent: ComponentType<P>
) {
    return function WithSessionProvider(props: P) {
        return (
            <SessionProvider>
                <WrappedComponent {...props} />
            </SessionProvider>
        );
    };
}
