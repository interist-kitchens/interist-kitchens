import type { UploadRequestOption } from 'rc-upload/lib/interface';

export const mockUploadFunc = (options: UploadRequestOption) => {
    if (options.onSuccess) {
        options.onSuccess('Ok');
    }
};
