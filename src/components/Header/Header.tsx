'use client'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { HeaderMenuItem } from '@/components/Header/data/header.data'
import route from '@/routes/routes'
import useMe from '@/features/auth/hooks/queries/useMe'
import Logo from '@/../public/icons/logo.svg'
import MenuIcon from '@/../public/icons/menu.svg'
import redirectStorage from '@/common/storages/redirect-storage'
import { usePathname } from 'next/navigation'
import MobileHeader from '@/components/Header/MobileHeader'
import { useSetAppContext } from '@/components/Providers/hooks/useSetAppContext'
import Button from '@/components/Button/Button'

interface HeaderProps {
  menu: HeaderMenuItem[]
}

function Header({ menu }: HeaderProps) {
  const { data: me } = useMe()
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

  const dispatch = useSetAppContext()

  const onOpenMobileHeader = useCallback(() => {
    dispatch((state) => ({ ...state, isMenuOpen: true }))
  }, [dispatch])

  return (
    <menu className="header header-border-b z-[9999] h-[4rem]">
      <ul className="navigator">
        {menu.map(({ text, to }) => (
          <li key={to} className={`${active(to)} mobile-hidden`}>
            <Link href={to} className="text-black dark:text-gray-200">
              {text}
            </Link>
          </li>
        ))}
      </ul>

      <Link href={route.index}>
        <Logo className="logo" width={100} height={32} />
      </Link>

      <ul className="navigator">
        <li className="mobile-hidden">
          <Link
            className="text-black dark:text-gray-200"
            href={me ? route.auth.logout : route.auth.signIn}
            onClick={onClickLink}
          >
            {me ? '로그아웃' : '로그인'}
          </Link>
        </li>

        <li className="mobile-hidden">
          <Link
            className="text-black dark:text-gray-200"
            href={me ? route.users.profile : route.auth.signUp}
            onClick={onClickLink}
          >
            {me ? '내 정보' : '회원가입'}
          </Link>
        </li>

        <Button className="mobile-visible icon-btn">
          <MenuIcon
            className="icon stroke-black dark:stroke-gray-200 stroke-2"
            onClick={onOpenMobileHeader}
          />
        </Button>
      </ul>

      <MobileHeader menu={menu} me={me} onClickLink={onClickLink} />
    </menu>
  )
}

export default Header
