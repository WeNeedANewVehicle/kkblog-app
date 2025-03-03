import useMe from '@/features/auth/hooks/queries/useMe'
import { useRouter } from 'next/navigation'
import React, { PropsWithChildren, useEffect } from 'react'

interface LogoutGuardProps extends PropsWithChildren {}
function LogoutGuard(props: LogoutGuardProps) {
  const { data: me, isFetching, isFetched } = useMe()
  const router = useRouter()

  useEffect(() => {
    if (!me || isFetching) {
      return
    }
    router.back()
  }, [me, isFetching, router])

  return props.children
}

export default LogoutGuard
