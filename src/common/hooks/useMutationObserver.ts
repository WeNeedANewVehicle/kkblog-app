import React, { RefObject, useEffect } from 'react'

interface UseMutationObserver<T> {
  callback: MutationCallback
  ref: RefObject<T>
  config?: MutationObserverInit
}
function useMutationObserver<T extends HTMLElement>({
  ref,
  callback,
  config,
}: UseMutationObserver<T>) {
  useEffect(() => {
    const observer = new MutationObserver(callback)
    const element = ref.current

    if (element) {
      observer.observe(element, config)
    }

    return () => {
      if (element) {
        observer.disconnect()
      }
    }
  }, [callback, config, ref])
}

export default useMutationObserver
