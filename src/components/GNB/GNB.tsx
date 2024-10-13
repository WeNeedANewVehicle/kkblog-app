import Link from 'next/link'
import React from 'react'
import { Menu } from './data/GNB.data'
import Logo from '../Icons/Logo'
import Hamburger from '../Icons/Hamburger'

interface GNBProps {
  menu: Menu
}

function GNB({ menu }: GNBProps) {
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
      </ul>
    </menu>
  )
}

export default GNB
