import { useMutation } from '@tanstack/react-query'
import { signInApi } from '@/features/auth/api/auth'
import { useRouter } from 'next/navigation'
import redirectStorage from '@/common/storages/redirect-storage'
import route from '@/routes/routes'

export const SIGN_IN = 'SIGN_IN'

function useSignIn() {
  const router = useRouter()
  const redirectionUrl = redirectStorage.getRedirectUrl()
  return useMutation({
    mutationFn: signInApi,
    onSuccess: () => {
      router.replace(redirectionUrl ?? route.index)
    }
  })
}

export default useSignIn
