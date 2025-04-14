import { UploadFiles } from '@/entities/categories';
import { message, Upload, UploadProps } from 'antd';

export const normFile = (e: UploadFiles) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.file;
};

export const uploadProps: UploadProps = {
    beforeUpload: (file) => {
        const isImage =
            file.type === 'image/png' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/webp';
        if (!isImage) {
            message.error(`${file.name} не картинка`);
        }
        return isImage || Upload.LIST_IGNORE;
    },
};
