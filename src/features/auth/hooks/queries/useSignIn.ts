import { useMutation } from '@tanstack/react-query'
import { signInApi } from '../../api/auth'
import { ErrorBaseResponse } from '@/common/dto/base-response.dto'
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
    },
    onError: (error: ErrorBaseResponse) => {
      alert(error.error.message)
    },
  })
}

export default useSignIn
