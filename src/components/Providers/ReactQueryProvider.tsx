'use client'
import { ErrorBaseResponse } from '@/common/dto/baseResponse'
import { HttpStatus } from '@/common/enum/http-status.enum'
import { isServer, QueryClient } from '@tanstack/react-query'

function retry(failureCount: number, error: ErrorBaseResponse) {
  switch (error.meta.status) {
    case HttpStatus.NOT_FOUND:
      return false
    case HttpStatus.FORBIDDEN:
      return false
    default:
      break
  }

  if (
    error.meta.status === HttpStatus.UNAUTHORIZED &&
    error.meta.code === 'ACCESS TOKEN EXPIRED'
  ) {
    return true
  }

  return failureCount <= 5
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      mutations: { retry },
      queries: {
        // SSR 에선 데이터를 가져온 뒤 일정 시간이 지났을 때 신선하지 않다고 판단할 기본 값을 0 이상으로 설정한다.
        // 클라이언트가 데이터를 다시 가져오는 작업을 피하기 위해서이다.
        staleTime: 60 * 1000,
        retryDelay: 500,
        retry,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: 항상 새로운 쿼리 클라이언트를 생성
    return makeQueryClient()
  } else {
    // Browser: 쿼리 클라이언트가 없을 때 쿼리 클라이언트를 새로 생성한다.
    // 이것은 매우 중요한데, 이렇게 해야 초기 렌더링을 기다리는 동안 새로운 클라이언트를 생성하지 않는다.
    // 이 과정은 불필요할수도 있다.
    // if we have a suspense boundary BELOW the creation of the query client 뭐라카노?
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient()
    }
    return browserQueryClient
  }
}

export default getQueryClient
