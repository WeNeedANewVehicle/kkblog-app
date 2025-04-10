'use client'

import Link from 'next/link'
import React, { useMemo } from 'react'
import buttonCss from '@/common/styles/button.module.css'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useGetPosts from '@/features/posts/hooks/useGetPosts'
import PostItem from '@/components/Post/PostItem/PostItem'

function PostsPage() {
  const { data: posts } = useGetPosts()

  const postList = useMemo(() => posts?.data ?? [], [posts?.data])
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <Search />

      <div className="flex w-full justify-end">
        <Link href={route.posts.write} className={`sm ${buttonCss.black}`}>
          글쓰기
        </Link>
      </div>

      <ul
        className={`grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}
      >
        {postList.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>
    </section>
  )
}

export default PostsPage
