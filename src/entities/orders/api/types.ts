import { $Enums, Product } from '@prisma/client';
import UserRole = $Enums.UserRole;
import OrderStatus = $Enums.OrderStatus;

export type Callback = {
    id: number;
    name: string;
    mail: string | null;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Order = {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: OrderStatus;
    phone: string;
    mail: string | null;
    productId: number;
    userId: string | null;
    products: Product;
    user: {
        name: string | null;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: UserRole;
    } | null;
};
