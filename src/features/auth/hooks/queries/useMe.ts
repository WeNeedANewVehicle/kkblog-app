import { useQuery } from '@tanstack/react-query'
import { authMeApi } from '../../api/auth'
import tokenStorage from '@/common/storages/token-storage'

export const ME = 'ME'

function useMe() {
  const accessToken = tokenStorage.getAccessToken()
  return useQuery({
    queryKey: [ME],
    queryFn: () => {
      return authMeApi(accessToken)
    },
    enabled: !!accessToken
  })
}

export default useMe
