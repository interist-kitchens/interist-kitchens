export type CategoriesResponse = {
    id: number;
    name: string;
    text?: string | null;
    image?: string | null;
    alias: string;
    createdAt: Date;
    updatedAt: Date;
    metaTitle?: string | null;
    metaDescription?: string | null;
    products: {
        name: string;
        id: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        metaTitle: string | null;
        metaDescription: string | null;
        text: string | null;
        alias: string;
        price: string;
        images: string[];
    }[];
};

export type Categories = {
    id: string;
    name: string;
    text?: string | null;
    image?: string | null;
    imageBlur?: string | null;
    alias: string;
    createdAt: string;
    updatedAt: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    products?: {
        name: string;
        id: number;
        image: string;
        imageBlur?: string | null;
        alias: string;
        price: string;
    }[];
};

export type UploadFile = {
    uid: string;
    lastModified: number;
    lastModifiedDate?: string;
    name: string;
    originFileObj: File;
    percent: number;
    response: string;
    size: number;
    status: string;
    thumbUrl: string;
    type: string;
};

export type UploadFiles = {
    file: UploadFile;
    fileList: UploadFile[];
};

export type Error = {
    name: string;
    code: string;
    clientVersion: string;
    meta: {
        modelName: string;
        target: string[];
    };
};
