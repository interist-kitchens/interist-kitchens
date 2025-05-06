export const getLastPathSegment = (path: string): string => {
    const segments = path.replace(/^\/+|\/+$/g, '').split('/');
    return segments[segments.length - 1] || '';
};
