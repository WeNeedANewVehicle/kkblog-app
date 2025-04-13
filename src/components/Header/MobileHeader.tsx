import React, { useCallback } from 'react'
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

  const { isMenuOpen } = useAppContext();
  
  const dispatch = useSetAppContext()

  const onCloseMobileHeader = useCallback(() => {
    dispatch(state => ({ ...state, isMenuOpen: false }))
  }, [dispatch]);

  return (
    <div className={`flex flex-col h-full fixed top-0 right-0 w-full mobile-visible bg-white dark:bg-gray-900 origin-right transition-transform z-[10000] ${isMenuOpen ? 'animate-collapse-x' : 'transform-[scaleX(0%)]'}`}>
      <div className="header-border-b p-4 border flex justify-between items-center">
        <LogoIcon className="logo" width={100} height="auto" />
        <Button className="icon-btn" onClick={onCloseMobileHeader}>
          <CloseIcon className='icon' />
        </Button>
      </div>
      <ul className='p-4 flex flex-col gap-4'>
        {menu.map(({ text, to }) => (
          <li key={to}>
            <Link href={to} className="text-black dark:text-gray-200">
              {text}
            </Link>
          </li>
        ))}

        <li>
          <Link
            className="text-black dark:text-gray-200"
            href={me ? route.auth.logout : route.auth.signIn}
            onClick={onClickLink}
          >
            {me ? '로그아웃' : '로그인'}
          </Link>
        </li>
        <li>
          <Link
            className="text-black dark:text-gray-200"
            href={me ? route.users.profile : route.auth.signUp}
            onClick={onClickLink}
          >
            {me ? '내 정보' : '회원가입'}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MobileHeader
