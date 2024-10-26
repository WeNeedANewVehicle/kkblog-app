import tokenStorage from '@/common/storages/token-storage'
import React, { useCallback } from 'react'

function useLogout() {
    const logout = useCallback(() => {
        tokenStorage.clearAccessToken()
    }, [])

    return {
        logout
    }
}

export default useLogout