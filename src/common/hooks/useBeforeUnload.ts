import React, { useCallback, useEffect } from 'react'

function useBeforeUnload() {
  useEffect(() => {
    const event = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    window.addEventListener('beforeunload', event)

    return () => {
      window.removeEventListener('beforeunload', event)
    }
  }, [])
}

export default useBeforeUnload
