export interface Paging {
  cursor: string
}

export interface Meta {
  status: number
  code: string
  paging?: Paging
}

export interface ErrorResponse {
  path: string
  timestamp: number
  message: string
}

export interface BaseResponse<T> {
  meta: Meta
  data: T
  error: null
}

export interface ErrorBaseResponse {
  meta: Meta
  data: null
  error: ErrorResponse
}
