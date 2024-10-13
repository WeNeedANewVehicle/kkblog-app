import useMe from '@/features/auth/hooks/queries/useMe'
import { useRouter } from 'next/navigation'
import React, { PropsWithChildren, useEffect } from 'react'

interface LogoutGuardProps extends PropsWithChildren {}
function LogoutGuard(props: LogoutGuardProps) {
  const router = useRouter()
  const { data: me } = useMe()

  useEffect(() => {
    if (!me) {
      return
    }

    router.back()
  }, [router, me])

  if (me) {
    return
  }

  return props.children
}

export default LogoutGuard
