import React, { useCallback, useEffect, useRef } from 'react'
import useIntersectionObserver from '@/common/hooks/useIntersectionObserver'
import { FetchNextPageOptions } from '@tanstack/react-query'

interface UseInfiniteScrollParams {
  fetchNextPage: (options?: FetchNextPageOptions) => unknown
  hasNextPage: boolean
}

function useInfiniteScroll<T extends HTMLElement>({
  hasNextPage,
  fetchNextPage,
}: UseInfiniteScrollParams) {
  const callback: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage()
        }
      })
    },
    [fetchNextPage]
  )

  const ref = useRef<T>(null)

  useIntersectionObserver({
    callback,
    ref,
    fetchNextPage,
    hasNextPage,
  })

  return ref
}

export default useInfiniteScroll
