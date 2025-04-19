import { Product } from '@/entities/products';

export type FormType = {
    product: Product;
    name: string;
    mail?: string;
    phone: string;
};
