import { useEffect } from 'react'

function usePreventScroll(watchValue: boolean) {
  useEffect(() => {
    if (watchValue) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [watchValue])
}

export default usePreventScroll
