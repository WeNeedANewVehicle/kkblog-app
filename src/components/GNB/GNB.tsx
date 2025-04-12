'use client'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { Menu } from '@/components/GNB/data/GNB.data'
import route from '@/routes/routes'
import useMe from '@/features/auth/hooks/queries/useMe'
import Logo from '@/../public/icons/logo.svg'
import redirectStorage from '@/common/storages/redirect-storage'
import { usePathname } from 'next/navigation'

interface GNBProps {
  menu: Menu
}

function GNB({ menu }: GNBProps) {
  const { data } = useMe()
  const pathname = usePathname()

  const onClickLink = useCallback(() => {
    redirectStorage.setRedirectUrl(pathname)
  }, [pathname])

  const active = useCallback(
    (url: string) =>
      pathname.startsWith(url)
        ? 'border-b-black dark:border-b-gray-200 border-b-2'
        : '',
    [pathname]
  )

  return (
    <menu className="gnb">
      <ul className="navigator">
        {menu.map(({ text, to }) => (
          <li key={to} className={active(to)}>
            <Link href={to} className="text-black dark:text-gray-200">
              {text}
            </Link>
          </li>
        ))}
      </ul>

      <Link href={route.index}>
        <Logo fill="white" width={100} height="auto" />
      </Link>

      <ul className="navigator">
        <li>
          <Link
            className="text-black dark:text-gray-200"
            href={data ? route.auth.logout : route.auth.signIn}
            onClick={onClickLink}
          >
            {data ? '로그아웃' : '로그인'}
          </Link>
        </li>

        <li>
          <Link
            className="text-black dark:text-gray-200"
            href={route.auth.signUp}
            onClick={onClickLink}
          >
            {data ? '내 정보' : '회원가입'}
          </Link>
        </li>
      </ul>
    </menu>
  )
}

export default GNB
