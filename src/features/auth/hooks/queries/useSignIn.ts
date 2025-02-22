import { useMutation } from '@tanstack/react-query'
import { signInApi } from '../../api/auth'
import tokenStorage from '@/common/storages/token-storage'
import { ErrorBaseResponse } from '@/common/dto/base-response.dto'
import { useRouter } from 'next/navigation'

export const SIGN_IN = 'SIGN_IN'

function useSignIn() {
  const router = useRouter()

  return useMutation({
    mutationFn: signInApi,
    onSuccess: ({ data }) => {
      router.back()
    },
    onError: (error: ErrorBaseResponse) => {
      alert(error.error.message)
    },
  })
}

export default useSignIn
