'use client'

import { useQuery } from '@tanstack/react-query'
import { authMeApi } from '../../api/auth'
import tokenStorage from '@/common/storages/token-storage'

export const ME = 'ME'

function useMe() {
  const accessToken = tokenStorage.getAccessToken()
  return useQuery({
    queryKey: [ME],
    queryFn: () => authMeApi(),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  })
}

export default useMe
