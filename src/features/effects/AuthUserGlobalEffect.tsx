import useMe from '@/features/auth/hooks/queries/useMe'
import React, { PropsWithChildren, useEffect } from 'react'
import { useSetAppContext } from '../../components/Providers/hooks/useSetAppContext'

interface AuthUserGlobalEffect extends PropsWithChildren {}
function AuthUserGlobalEffect({ children }: AuthUserGlobalEffect) {
  const { data, isSuccess } = useMe()
  const dispatch = useSetAppContext()

  useEffect(() => {
    if (isSuccess) {
      dispatch((state) => ({
        ...state,
        user: data,
      }))
    }
  }, [data, isSuccess])

  return children
}

export default AuthUserGlobalEffect
