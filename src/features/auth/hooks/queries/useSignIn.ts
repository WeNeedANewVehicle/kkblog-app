import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signInApi } from '@/features/auth/api/auth'
import { useRouter } from 'next/navigation'
import redirectStorage from '@/common/storages/redirect-storage'
import route from '@/routes/routes'
import { ME } from '@/features/auth/hooks/queries/useMe'

export const SIGN_IN = 'SIGN_IN'

function useSignIn() {
  const router = useRouter()
  const redirectionUrl = redirectStorage.getRedirectUrl()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signInApi,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ME]
      });

      router.replace(redirectionUrl ?? route.index)

    },
  })
}

export default useSignIn
