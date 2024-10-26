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

    try {
        const result = await fetch(baseUrl + url + (queries ?? ''), {
            method,
            body: JSON.stringify(body),
            headers,
            credentials,
        })

        return await result.json() as unknown as BaseResponse<T>
    } catch (e) {

        const error = e as unknown as ErrorBaseResponse;
        throw error;
    }

}

export default api;