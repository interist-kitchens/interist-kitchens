import { UserRole } from '@prisma/client';
import 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        phone?: string | null;
        role: UserRole;
    }

    interface Session {
        user: User;
        expires: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        phone?: string | null;
        role: UserRole;
    }
}
