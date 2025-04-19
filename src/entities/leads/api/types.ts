import { Product } from '@/entities/products';
import { User } from 'next-auth';

export type FormType = {
    user?: User;
    product: Product;
    name: string;
    mail?: string;
    phone: string;
};
