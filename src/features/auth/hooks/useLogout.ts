import tokenStorage from '@/common/storages/token-storage'
import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import { ME } from './queries/useMe'

function useLogout() {
  const queryClient = useQueryClient()
  const logout = useCallback(() => {
    tokenStorage.clearAccessToken()
    queryClient.removeQueries({ queryKey: [ME] })
  }, [queryClient])

  return {
    logout,
  }
}

export default useLogout
