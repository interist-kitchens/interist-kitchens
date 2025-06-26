import { $Enums } from '@prisma/client';

export type UpdateProfileParams = {
    name?: string;
    phone?: string;
    avatar?: File | string;
    role?: $Enums.UserRole;
};

export type ProfileResponse = {
    id: string;
    name: string;
    email: string;
    image?: string;
    phone?: string;
    role: string;
};

export type User = {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    phone: string | null;
    role: $Enums.UserRole;
};
