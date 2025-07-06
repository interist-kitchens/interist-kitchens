import { createEffect } from 'effector';

type CreateRequestParams = RequestInit & {
    url: string;
};

type Fn<P> = (params: P) => CreateRequestParams;

type Payload<P> = CreateRequestParams | Fn<P>;

type CreateRequestInstanceParams<P> = {
    baseURL?: string;
    headers?: HeadersInit;
    payload: Payload<P>;
    withTokenInHeaders?: boolean;
};

type CreateRequestFxParams = Omit<
    CreateRequestInstanceParams<CreateRequestParams>,
    'payload' | 'url'
>;

function getConfig<P>(payload: Payload<P>, params: P): CreateRequestParams {
    return typeof payload === 'function' ? payload(params) : payload;
}

const createRequestInstance = <P = CreateRequestParams, R = void, E = Error>({
    baseURL,
    headers,
    payload,
    withTokenInHeaders,
}: CreateRequestInstanceParams<P>) =>
    createEffect<P, R, E>(async (params) => {
        const { url, ...fetchOptions } = getConfig(payload, params);

        const newHeaders = new Headers(headers);

        if (withTokenInHeaders) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                newHeaders.append('Authorization', `Bearer ${token}`);
            }
        }

        const fullUrl = baseURL ? `${baseURL}${url}` : url;

        const response = await fetch(fullUrl, {
            ...fetchOptions,
            headers: newHeaders,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: `Request failed with status ${response.status}`,
            }));
            throw new Error(
                error.message || `Request failed with status ${response.status}`
            );
        }

        return response.json() as Promise<R>;
    });

export const createRequestFx =
    (params: CreateRequestFxParams) =>
    <P = CreateRequestParams, R = void, E = Error>(payload: Payload<P>) =>
        createRequestInstance<P, R, E>({
            ...params,
            payload,
        });
