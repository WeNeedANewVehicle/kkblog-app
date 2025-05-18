import { ErrorBaseResponse } from '@/common/dto/baseResponse'
import { HttpStatus } from '@/common/enum/http-status.enum'

export function isTokenExpiredError(err: ErrorBaseResponse) {
  return (
    err?.meta?.status === HttpStatus.UNAUTHORIZED &&
    err?.meta?.code === 'ACCESS TOKEN EXPIRED'
  )
}
