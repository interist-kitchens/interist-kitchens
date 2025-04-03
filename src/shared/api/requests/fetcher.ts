import axios, { AxiosHeaders, AxiosInterceptorOptions } from 'axios';

export interface FetchRequest<Req> {
    path: string;
    data?: Req;
    query?: { [key: string]: string | number };
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
    headers?: AxiosHeaders;
    options?: AxiosInterceptorOptions;
}

export async function fetcher<Res, Req = never>({
    path,
    data,
    query,
    method = 'GET',
    headers,
    options,
}: FetchRequest<Req>): Promise<Res> {
    try {
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_INTERNAL_API_URL}${path}`
        );

        if (query) {
            Object.keys(query).forEach((key) =>
                url.searchParams.append(key, query[key].toString())
            );
        }

        const response = await axios.request({
            url: url.href,
            method: method,
            data: data ? JSON.stringify(data) : undefined,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...headers,
            },
            ...options,
        });

        if (response.status !== 200) {
            return Promise.reject(response.statusText);
        }

        return await response.data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}
