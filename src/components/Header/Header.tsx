'use client'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { HeaderMenuItem } from '@/components/Header/data/header.data'
import route from '@/routes/routes'
import Logo from '@/../public/icons/logo.svg'
import MenuIcon from '@/../public/icons/menu.svg'
import redirectStorage from '@/common/storages/redirect-storage'
import { usePathname } from 'next/navigation'
import MobileHeader from '@/components/Header/MobileHeader'
import { useSetAppContext } from '@/components/Providers/hooks/useSetAppContext'
import Button from '@/components/Button/Button'
import { useAppContext } from '@/components/Providers/hooks/useAppContext';
import HeaderItem from '@/components/Header/HeaderItem'

interface HeaderProps {
  menu: HeaderMenuItem[]
}

function Header({ menu }: HeaderProps) {
  const { user } = useAppContext()
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
    <div className="header-wrapper flex-1 z-10001 backdrop-blur-sm">
      <menu className="header header-border-b h-[4rem]">
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
          <HeaderItem href={user ? route.users.profile : route.auth.signUp} onClick={onClickLink}>
            {user? '내 정보' : '회원가입'}
          </HeaderItem>

          <HeaderItem href={user ? route.auth.logout : route.auth.signIn} onClick={onClickLink}>
            {user ? '로그아웃' : '로그인'}
          </HeaderItem>

          <Button className="mobile-visible icon-btn">
            <MenuIcon
              className="icon stroke-black dark:stroke-gray-200 stroke-2"
              onClick={onOpenMobileHeader}
            />
          </Button>
        </ul>

        <MobileHeader menu={menu} user={user} onClickLink={onClickLink} />
      </menu>
    </div>
  )
}

export default Header
