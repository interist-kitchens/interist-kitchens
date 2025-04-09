export type CategoriesResponse = {
    id: number;
    name: string;
    text?: string | null;
    image?: string | null;
    alias: string;
    createdAt: Date;
    updatedAt: Date;
    meta_title?: string | null;
    meta_description?: string | null;
};

export type Categories = {
    id: string;
    name: string;
    text?: string | null;
    image?: string | null;
    alias: string;
    createdAt: string;
    updatedAt: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
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
