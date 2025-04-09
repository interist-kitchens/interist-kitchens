import { createEffect } from 'effector';
import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';

type CreateRequestParams = AxiosRequestConfig & {
    url: string;
};

type Fn<P> = (params: P) => CreateRequestParams;

type Payload<P> = CreateRequestParams | Fn<P>;

type CreateRequestInstanceParams<P> = CreateRequestParams & {
    withTokenInHeaders?: boolean;
    payload: Payload<P>;
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
    createEffect<P, AxiosResponse<R>, AxiosError<E>>(async (params) => {
        const { url, ...fetchOptions } = getConfig(payload, params);

        const newHeaders = { ...headers } as AxiosHeaders;

        if (withTokenInHeaders) {
            newHeaders['Authorization'] =
                `Bearer ${localStorage.getItem('accessToken')}`;
        }

        return axios.request<R>({
            url,
            ...fetchOptions,
            headers: newHeaders,
            baseURL,
        });
    });

export const createRequestFx =
    (params: CreateRequestFxParams) =>
    <P = CreateRequestParams, R = void, E = Error>(payload: Payload<P>) =>
        createRequestInstance<P, R, E>({
            ...(params as CreateRequestParams),
            payload,
        });
