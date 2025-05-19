import tokenStorage from '@/common/storages/token-storage'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { ME } from './queries/useMe'
import { useSetAppContext } from '@/components/Providers/hooks/useSetAppContext'

function useLogout() {
  const queryClient = useQueryClient()
  const dispatch = useSetAppContext()

  const logout = useCallback(() => {
    tokenStorage.clearAccessToken();
    dispatch((state) => ({ ...state, user: null }));
    queryClient.removeQueries({ queryKey: [ME] });
  }, [queryClient])

  return {
    logout,
  }
}

export default useLogout
