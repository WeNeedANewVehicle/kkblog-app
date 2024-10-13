import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <div>
      <b id="logo">
        <Link href={route.index}>KKBlog</Link>
      </b>
    </div>
  )
}

export default Logo
