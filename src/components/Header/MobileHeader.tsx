'use client'

import React, { useCallback, MouseEvent } from 'react'
import LogoIcon from '@/../public/icons/logo.svg'
import CloseIcon from '@/../public/icons/close.svg'
import { HeaderMenuItem } from './data/header.data'
import Link from 'next/link'
import { MeResponseDto } from '@/features/auth/api/dto/signIn.dto'
import Button from '@/components/Button/Button'
import route from '@/routes/routes'
import { useAppContext } from '@/components/Providers/hooks/useAppContext'
import { useSetAppContext } from '@/components/Providers/hooks/useSetAppContext'

interface MobileHeaderProps {
  menu: HeaderMenuItem[]
  me: MeResponseDto | undefined
  onClickLink: () => void
}

function MobileHeader({ menu, me, onClickLink }: MobileHeaderProps) {
  const { isMenuOpen } = useAppContext()

  const dispatch = useSetAppContext()

  const onCloseMobileHeader = useCallback(() => {
    dispatch((state) => ({ ...state, isMenuOpen: false }))
  }, [dispatch])

  const onClickMobileLink = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    onCloseMobileHeader()
    onClickLink()
  }, [])

  return (
    <div
      className={`flex flex-col h-full fixed top-0 right-0 w-full mobile-visible bg-white dark:bg-gray-900 origin-right transition-transform z-[10000] ${isMenuOpen ? 'animate-collapse-x' : 'transform-[scaleX(0%)]'}`}
    >
      <div className="border-b header-border-b p-4 flex justify-between items-center">
        <Link href={route.index} onClick={onCloseMobileHeader}>
          <LogoIcon className="logo" width={100} height="auto" />
        </Link>

        <Button className="icon-btn" onClick={onCloseMobileHeader}>
          <CloseIcon className="icon [&>path]:stroke-black dark:[&>path]:stroke-gray-200" />
        </Button>
      </div>

      <ul className="p-4 flex flex-col">
        {menu.map(({ text, to }) => (
          <li key={to} className="flex flex-1">
            <Link
              href={to}
              onClick={onCloseMobileHeader}
              className="w-full py-2 text-black dark:text-gray-200"
            >
              {text}
            </Link>
          </li>
        ))}

        <li className="flex flex-1">
          <Link
            className="text-black dark:text-gray-200 w-full py-2"
            href={me ? route.auth.logout : route.auth.signIn}
            onClick={onClickMobileLink}
          >
            {me ? '로그아웃' : '로그인'}
          </Link>
        </li>

        <li className="flex flex-1">
          <Link
            className="text-black dark:text-gray-200 w-full py-2"
            href={me ? route.users.profile : route.auth.signUp}
            onClick={onClickMobileLink}
          >
            {me ? '내 정보' : '회원가입'}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MobileHeader
