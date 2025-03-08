import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'

function PostsPage() {
  return (
    <>
      <section className="flex items-center justify-center">
        <Search />
      </section>
      <Link
        href={route.posts.write}
        className="btn-md bg-burgundy-600 text-white"
      >
        글쓰기
      </Link>
    </>
  )
}

export default PostsPage
