'use client'
import useLogout from '@/features/auth/hooks/useLogout'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import route from '@/routes/routes'

function Page() {
  const { logout } = useLogout()
  const router = useRouter()

  useEffect(() => {
    logout()

    const redirect = setTimeout(() => {
      router.replace(route.index)
    }, 1000 * 3)

    return () => {
      clearTimeout(redirect)
    }

    // eslint-disable-next-line
  }, [])
  return <div>로그아웃 되었습니다.</div>
}

export default Page
