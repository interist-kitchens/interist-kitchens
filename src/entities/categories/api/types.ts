export type Categories = {
    id: string;
    name: string;
    text: string;
    image: string;
    alias: string;
    createdAt: string;
    updatedAt: string;
    metaTitle: string;
    metaDescription: string;
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
