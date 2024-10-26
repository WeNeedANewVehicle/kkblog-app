'use client'
import Link from 'next/link'
import React from 'react'
import { Menu } from './data/GNB.data'
import Logo from '../Icons/Logo'
import Hamburger from '../Icons/Hamburger'
import route from '@/routes/routes'
import useMe from '@/features/auth/hooks/queries/useMe'

interface GNBProps {
  menu: Menu
}

function GNB({ menu }: GNBProps) {
  const { data } = useMe()

  return (
    <menu
      className={
        'fixed flex h-[50px] justify-between items-center px-4 box-border w-full'
      }
    >
      <span className="flex md:hidden">
        <button>
          <Hamburger />
        </button>
      </span>

      <Logo />

      <ul className="hidden md:flex gap-4">
        {menu &&
          menu.map(({ text, to }) => (
            <li key={to}>
              <Link href={to} className="font-extrabold">
                {text}
              </Link>
            </li>
          ))}
        <li>
          <Link
            href={data ? route.auth.logout : route.auth.signIn}
            className="font-extrabold"
          >
            {data ? '로그아웃' : '로그인'}
          </Link>
        </li>
      </ul>
    </menu>
  )
}

export default GNB
