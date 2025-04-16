import { OrderBy } from '@/common/types/orderBy.type'

export interface Paging {
  cursor?: string
  pageSize?: number
  orderBy?: OrderBy
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
