'use client'

import React, { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import getQueryClient from './ReactQueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function Provider({ children }: PropsWithChildren) {
  // NOTE: 쿼리 클라이언트를 초기화 하는 중에는 useState 사용을 피할 것.
  //       if you don't have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary

  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export default Provider
