import { RcFile } from 'antd/es/upload';

export const appendFieldsToFormData = (
    formData: FormData,
    fields: Record<string, string | RcFile>
) =>
    Object.entries(fields).forEach(([key, value]) =>
        formData.append(key, value)
    );
