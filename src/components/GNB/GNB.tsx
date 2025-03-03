'use client'
import Link from 'next/link'
import React from 'react'
import { Menu } from './data/GNB.data'
import route from '@/routes/routes'
import useMe from '@/features/auth/hooks/queries/useMe'
import Logo from '@/../public/icons/logo.svg'
import './GNB.css'

interface GNBProps {
  menu: Menu
}

function GNB({ menu }: GNBProps) {
  const { data } = useMe()

  return (
    <menu className="gnb">
      <Link href={route.index}>
        <Logo fill="white" className="logo" />
      </Link>

      <ul className="navigator">
        {menu.map(({ text, to }) => (
          <li key={to} className="link">
            <Link href={to}>{text}</Link>
          </li>
        ))}
        <li className="link">
          <Link href={data ? route.auth.logout : route.auth.signIn}>
            {data ? '로그아웃' : '로그인'}
          </Link>
        </li>
      </ul>
    </menu>
  )
}

export default GNB
