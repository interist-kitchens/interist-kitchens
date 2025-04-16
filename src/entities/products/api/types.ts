import { UploadFile } from 'antd';

export type ProductResponse = {
    name: string;
    id: number;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    metaTitle: string | null;
    metaDescription: string | null;
    text: string | null;
    alias: string;
    categoryId: number;
    categories: { name: string };
    price: string;
    images: string[];
};

export type Product = {
    name: string;
    id: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    metaTitle: string | null;
    metaDescription: string | null;
    text: string | null;
    alias: string;
    categoryId: number;
    categoryName: string;
    price: string;
    images: string[];
};

export type FormFieldType = {
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    text?: string;
    image: UploadFile[];
    images?: UploadFile[];
    alias: string;
    categoryId: string;
    price: string;
};
