import { baseUrl, METHODS } from '@/common/constant/constant'
import { HttpStatus } from '@/common/enum/http-status.enum'
import { BaseResponse, ErrorBaseResponse } from '@/common/dto/baseResponse'
import tokenStorage from '@/common/storages/token-storage'
import { refreshAccessTokenApi } from '@/features/auth/api/auth'

interface ApiParams<P> {
  url: string
  method?: METHODS
  queries?: string
  body?: P
  credentials?: RequestInit['credentials']
  accessToken?: string | null
  middleware?: (response: Response) => unknown
}

async function api<P, T>({
  url,
  method,
  body,
  queries,
  credentials,
  accessToken,
  middleware,
}: ApiParams<P>): Promise<BaseResponse<T>> {
  if (!method) {
    method = METHODS.GET
  }

  const isFile = body instanceof FormData
  const headers: RequestInit['headers'] = {
    'Content-Type': 'application/json',
  }

  if (isFile) {
    delete headers['Content-Type']
    headers['Accept-Charset'] = 'utf-8'
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  try {
    const result = await fetch(baseUrl + url + (queries ? `?${queries}` : ''), {
      method,
      body: isFile ? body : JSON.stringify(body),
      headers,
      credentials,
    })

    if (middleware) {
      middleware(result)
    }

    if (result.ok) {
      const data = await result.json()
      return data as BaseResponse<T>
    }

    throw (await result.json()) as ErrorBaseResponse
  } catch (e) {
    const error = e as unknown as ErrorBaseResponse
    if (
      error?.meta?.status === HttpStatus.UNAUTHORIZED &&
      error?.meta?.code === 'ACCESS TOKEN EXPIRED'
    ) {
      await refreshAccessTokenApi()
      // .then((res) => {
      //   if (res.data.meta.status === HttpStatus.NOT_FOUND) {
      //     tokenStorage.clearAccessToken();
      //   }
      // })
    }

    throw error
  }
}

export default api
