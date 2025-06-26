export const appendFieldsToFormData = (
    formData: FormData,
    fields: Record<string, unknown>
) => {
    Object.entries(fields).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item instanceof File || item instanceof Blob) {
                    formData.append(
                        `${key}[]`,
                        item,
                        (item as File).name || 'file'
                    );
                } else if (typeof item === 'object') {
                    formData.append(`${key}[]`, JSON.stringify(item));
                } else {
                    formData.append(`${key}[]`, String(item));
                }
            });
        } else if (value instanceof File || value instanceof Blob) {
            formData.append(key, value, (value as File).name || 'file');
        } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, String(value));
        }
    });
};
