import { useRef } from 'react'

function useIntersectionObserver(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
  const observer = new IntersectionObserver(callback, options)
  return observer;
}

export default useIntersectionObserver
