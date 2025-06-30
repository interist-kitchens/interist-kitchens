import { UploadFile } from 'antd';
import { $Enums } from '@prisma/client';

export type ProductResponse = {
    name: string;
    id: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    metaTitle: string | null;
    metaDescription: string | null;
    text: string | null;
    alias: string;
    categoryId: number;
    categories: { name: string; alias: string };
    price: string;
    images: string[];
    relatedFrom: {
        type: string;
        toProduct: {
            id: number;
            name: string;
            alias: string;
            image: string;
            price: string;
            categories: {
                name: string;
                alias: string;
            } | null;
        };
    }[];
    coordinates: {
        relatedProductId: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        x: number;
        y: number;
    }[];
    attributes: {
        id: number;
        createdAt: Date;
        productId: number;
        attributeId: number;
        value: string;
        isPublic: boolean;
        attribute: {
            id: number;
            name: string;
            slug: string;
            createdAt?: Date;
            updatedAt?: Date;
        };
    }[];
};

export type ProductRelation = {
    id: string;
    name: string;
    alias: string;
    image: string;
    price: string;
    type: $Enums.ProductRelationType;
    categories: {
        name: string;
        alias: string;
    };
};

export type Product = {
    name: string;
    id: string;
    image: string;
    imageBlur?: string;
    createdAt: string;
    updatedAt: string;
    metaTitle: string | null;
    metaDescription: string | null;
    text: string;
    alias: string;
    categoryId: number;
    categoryName?: string;
    price: string;
    images: {
        image: string;
        blurImage?: string;
    }[];
    categories: { name: string; alias: string };
    relatedProducts?: ProductRelation[];
    coordinates: {
        relatedProductId: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        x: number;
        y: number;
    }[];
    attributes: {
        id: number;
        createdAt: Date;
        productId: number;
        attributeId: number;
        value: string;
        isPublic: boolean;
        attribute: {
            id: number;
            name: string;
            slug: string;
            createdAt?: Date;
            updatedAt?: Date;
        };
    }[];
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
    relatedProducts?: Array<{
        productId: number;
        type: $Enums.ProductRelationType;
    }>;
};

export type Relation = {
    relatedProductId: string;
    type: $Enums.ProductRelationType;
    productName: string;
};
