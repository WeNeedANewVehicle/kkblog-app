import { ErrorBaseResponse } from '@/common/dto/baseResponse'
import { HttpStatus } from '@/common/enum/http-status.enum'
import { isRefreshTokenExpiredError } from '@/common/constant/constant'

export function isTokenExpiredError(err: ErrorBaseResponse) {
  return (
    err?.meta?.status === HttpStatus.UNAUTHORIZED &&
    err?.meta?.code === 'ACCESS TOKEN EXPIRED'
  )
}

export function isRefreshExpiredError(err: ErrorBaseResponse) {
  return (
    err.error.path === '/auth/refresh/token' &&
    err.meta.status === HttpStatus.UNAUTHORIZED && err.meta.code === isRefreshTokenExpiredError
  )
}