import { ErrorBaseResponse } from '@/common/dto/base-response.dto'
import '@tanstack/react-query'

declare module '@tanstack/react-query' {
  interface Register {
    // react query의 기본 에러 타입을 정의 https://tanstack.com/query/latest/docs/framework/react/typescript#registering-a-global-error
    defaultError: ErrorBaseResponse
  }
}
