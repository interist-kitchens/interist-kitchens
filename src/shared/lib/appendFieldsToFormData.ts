import { RcFile } from 'antd/es/upload';

export const appendFieldsToFormData = (
    formData: FormData,
    fields: Record<string, string | RcFile | (RcFile | string)[]>
) =>
    Object.entries(fields).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (typeof item === 'string') {
                    formData.append(`${key}[]`, item);
                } else {
                    formData.append(`${key}[]`, item, item.name);
                }
            });
        } else {
            formData.append(key, value);
        }
    });
