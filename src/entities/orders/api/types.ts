import { $Enums, Product } from '@prisma/client';
import UserRole = $Enums.UserRole;
import OrderStatus = $Enums.OrderStatus;
import PaymentType = $Enums.PaymentType;

export type Callback = {
    id: number;
    name: string;
    email: string | null;
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
    email: string;
    address: string;
    payment: PaymentType;
    userId: string | null;
    items: {
        id: number;
        productId: number;
        orderId: number;
        quantity: number;
        priceAtOrder: string;
        product: Product;
    }[];
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

export type IndividualOrder = {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    product: Product;
    createdAt: Date;
    updatedAt: Date;
};

export type UserOrder = {
    id: number;
    status: $Enums.OrderStatus;
    createdAt: Date;
    items: {
        product: {
            name: string;
            price: string;
        };
        quantity: number;
    }[];
};
