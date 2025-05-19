'use client'

import React, { useCallback, MouseEvent, useEffect } from 'react'
import LogoIcon from '@/../public/icons/logo.svg'
import CloseIcon from '@/../public/icons/close.svg'
import { HeaderMenuItem } from './data/header.data'
import Link from 'next/link'
import Button from '@/components/Button/Button'
import route from '@/routes/routes'
import { useAppContext } from '@/components/Providers/hooks/useAppContext'
import { useSetAppContext } from '@/components/Providers/hooks/useSetAppContext'
import { MeResponseDto } from '@/features/auth/api/dto/signIn.dto'
import usePreventScroll from '@/common/hooks/usePreventScroll'

interface MobileHeaderProps {
  menu: HeaderMenuItem[]
  user: MeResponseDto | null
  onClickLink: () => void
}

function MobileHeader({ menu, user, onClickLink }: MobileHeaderProps) {
  const { isMenuOpen } = useAppContext()

  const dispatch = useSetAppContext()

  const onCloseMobileHeader = useCallback(() => {
    dispatch((state) => ({ ...state, isMenuOpen: false }))
  }, [dispatch])

  const onClickMobileLink = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onCloseMobileHeader()
      onClickLink()
    },
    [onClickLink, onCloseMobileHeader]
  )

  return (
    <div
      className={`mobile-header-wrapper mobile-visible ${isMenuOpen ? 'animate-collapse-x' : 'transform-[scaleX(0%)]'}`}
    >
      <div className="border-b header-border-b p-4 flex justify-between items-center">
        <Link href={route.index} onClick={onCloseMobileHeader}>
          <LogoIcon className="logo" width={100} height={32} />
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
            href={user ? route.users.profile : route.auth.signUp}
            onClick={onClickMobileLink}
          >
            {user ? '내 정보' : '회원가입'}
          </Link>
        </li>

        <li className="flex flex-1">
          <Link
            className="text-black dark:text-gray-200 w-full py-2"
            href={user ? route.auth.logout : route.auth.signIn}
            onClick={onClickMobileLink}
          >
            {user ? '로그아웃' : '로그인'}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MobileHeader
