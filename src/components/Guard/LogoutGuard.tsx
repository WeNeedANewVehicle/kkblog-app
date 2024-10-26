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

    console.log('logout guard', me)
    router.back()
  }, [me, isFetching, router])

  return <div> {!me && props.children}</div>
}

export default LogoutGuard
