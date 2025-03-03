import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import Link from 'next/link'
import React from 'react'

function PostsPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Search />
        <Link
          href={route.posts.write}
          className="btn-md bg-burgundy-600 text-white"
        >
          글쓰기
        </Link>
      </div>
    </div>
  )
}

export default PostsPage
