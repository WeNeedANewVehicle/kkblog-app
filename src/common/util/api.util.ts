import { baseUrl, METHODS } from "../constant/constant";
import { BaseResponse, ErrorBaseResponse } from "../dto/base-response.dto";

interface ApiParams<P> {
    url: string;
    method?: METHODS;
    queries?: string;
    body?: P;
    credentials?: RequestInit['credentials'];
    accessToken?: string | null;
}

async function api<P, T>({ url, method, body, queries, credentials, accessToken }: ApiParams<P>) {

    if (!method) {
        method = METHODS.GET;
    }

    const headers: RequestInit['headers'] = {
        "Content-Type": "application/json",
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }
    const result = await fetch(baseUrl + url + (queries ?? ''), {
        method,
        body: JSON.stringify(body),
        headers,
        credentials,
    })


    return result.json() as unknown as BaseResponse<T>;
}

export default api;