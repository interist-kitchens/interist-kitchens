import { Product } from '@/entities/products';
import { User } from 'next-auth';

export type PaymentType = 'cash';

export type FormType = {
    user?: User;
    product: Product;
} & OrderProjectFormType;

export type OrderProjectFormType = {
    name: string;
    mail?: string;
    phone: string;
};

export type DeliveryCartType = {
    name: string;
    email?: string;
    phone: string;
    address: string;
};

export type CartOrderType = {
    products: {
        product: Product;
        count: number;
    }[];
    payment: PaymentType;
    delivery: DeliveryCartType;
};
