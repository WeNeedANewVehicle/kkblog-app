import redirectStorage from '@/common/storages/redirect-storage'
import useMe from '@/features/auth/hooks/queries/useMe'
import route from '@/routes/routes'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useLayoutEffect } from 'react'

interface LoginGuardProps extends PropsWithChildren {}
function LoginGuard(props: LoginGuardProps) {
  const router = useRouter()
  const { data: me, isFetching } = useMe()
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (isFetching || me) {
      return
    }

    redirectStorage.setRedirectUrl(pathname)
    router.push(route.auth.signIn)
  }, [router, me, isFetching, pathname])
  return props.children
}

export default LoginGuard
