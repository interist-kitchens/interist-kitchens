import { Product } from '@/entities/products';
import { User } from 'next-auth';

export type FormType = {
    user?: User;
    product: Product;
} & OrderProjectFormType;

export type OrderProjectFormType = {
    name: string;
    mail?: string;
    phone: string;
};
