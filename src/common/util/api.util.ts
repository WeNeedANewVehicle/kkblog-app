import { baseUrl, HttpStatus, METHODS } from '@/common/constant/constant'
import { BaseResponse, ErrorBaseResponse } from '@/common/dto/base-response.dto'
import tokenStorage from '@/common/storages/token-storage'
import { messages } from '@/common/messages/messages'
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
}: ApiParams<P>) {
  if (!method) {
    method = METHODS.GET
  }

  const headers: RequestInit['headers'] = {
    'Content-Type': 'application/json',
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  try {
    const result = await fetch(baseUrl + url + (queries ?? ''), {
      method,
      body: JSON.stringify(body),
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
    }

    throw error
  }
}

export default api
