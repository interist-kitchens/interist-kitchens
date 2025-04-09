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
};

export type Product = {
    name: string;
    id: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    metaTitle: string | null;
    metaDescription: string | null;
    text: string | null;
    alias: string;
    categoryId: number;
    categoryName: string;
};
