import React, { useCallback, useRef } from 'react'
import useMutationObserver from '@/common/hooks/useMutationObserver'

function useDomMutation<T extends HTMLElement>(config?: MutationObserverInit) {
  const callback: MutationCallback = useCallback((mutationList, observer) => {
    for (const mutation of mutationList) {
      console.log('Mutation: ', mutation)
    }
  }, [])

  const ref = useRef<T>(null)
  useMutationObserver({ callback, ref, config })

  return ref
}

export default useDomMutation
