import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

function useNavigation() {
  const router = useRouter()
  const goBack = useCallback(() => router.back(), [router])
  const goForward = useCallback(() => router.forward(), [router])

  return {
    goBack,
    goForward,
  }
}

export default useNavigation
