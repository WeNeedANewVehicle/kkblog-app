import useMe from '@/features/auth/hooks/queries/useMe'
import route from '@/routes/routes'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect } from 'react'

interface LoginGuardProps extends PropsWithChildren {}
function LoginGuard(props: LoginGuardProps) {
  const router = useRouter()
  const { data: me, isFetching } = useMe()

  useEffect(() => {
    if (me || isFetching) {
      return
    }

    router.replace(route.auth.signIn)
  }, [router, me, isFetching])
  return props.children
}

export default LoginGuard
