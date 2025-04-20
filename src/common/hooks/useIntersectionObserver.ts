import { FetchNextPageOptions } from '@tanstack/react-query'
import { RefObject, useEffect, useRef } from 'react'

interface UseIntersectionObserverParams<T> {
  callback: IntersectionObserverCallback
  options?: IntersectionObserverInit
  ref: RefObject<T>
  fetchNextPage: (options?: FetchNextPageOptions) => unknown
  hasNextPage: boolean
}
function useIntersectionObserver<T extends HTMLElement>({
  callback,
  options,
  ref,
  hasNextPage,
  fetchNextPage,
}: UseIntersectionObserverParams<T>) {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)

    const element = ref.current
    if (!hasNextPage) {
      return
    }

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [hasNextPage, fetchNextPage])
}

export default useIntersectionObserver
