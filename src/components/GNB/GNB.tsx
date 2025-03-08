'use client'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { Menu } from './data/GNB.data'
import route from '@/routes/routes'
import useMe from '@/features/auth/hooks/queries/useMe'
import Logo from '@/../public/icons/logo.svg'
import redirectStorage from '@/common/storages/redirect-storage'
import { usePathname } from 'next/navigation'
import styles from './GNB.module.css'

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
    (url: string) => (pathname.startsWith(url) ? styles.active : ''),
    [pathname]
  )

  return (
    <menu id={styles.gnb}>
      <ul className={styles.navigator}>
        {menu.map(({ text, to }) => (
          <li key={to} className={active(to)}>
            <Link href={to} className={styles.link}>
              {text}
            </Link>
          </li>
        ))}
      </ul>

      <Link href={route.index}>
        <Logo fill="white" className="logo" />
      </Link>

      <ul className={styles.navigator}>
        <li>
          <Link
            role=""
            className={styles.link}
            href={data ? route.auth.logout : route.auth.signIn}
            onClick={onClickLink}
          >
            {data ? '로그아웃' : '로그인'}
          </Link>
        </li>

        <li>
          <Link
            className={styles.link}
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
