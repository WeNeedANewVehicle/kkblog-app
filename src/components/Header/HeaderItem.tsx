import Link from 'next/link'
import React, { AnchorHTMLAttributes, HTMLAttributes } from 'react'

interface HeaderItemProps
  extends Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'onClick' | 'href' | 'children'
  > {}
function HeaderItem({ onClick, href, children }: HeaderItemProps) {
  return (
    <li className="mobile-hidden">
      <Link
        className="text-black dark:text-gray-200"
        href={href!}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  )
}

export default React.memo(HeaderItem)
