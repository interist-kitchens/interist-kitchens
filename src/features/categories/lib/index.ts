import { UploadFiles } from '@/entities/categories';

export const normFile = (e: UploadFiles) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.file;
};
