'use client'

import Link from 'next/link'
import React, { useMemo } from 'react'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useGetPosts from '@/features/posts/hooks/useGetPosts'
import PostItem from '@/components/Post/PostItem/PostItem'
import useMe from '@/features/auth/hooks/queries/useMe'

function PostsPage() {
  const { data: posts } = useGetPosts()
  const { data: me } = useMe()
  const postList = useMemo(() => posts?.data ?? [], [posts?.data])
  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-20">
      <Search />

      <div className="flex w-full justify-end">
        {me && (
          <Link href={route.posts.write} className="btn-black px-3 py-2.5">
            글쓰기
          </Link>
        )}
      </div>

      <ul
        className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
      >
        {postList.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>
    </section>
  )
}

export default PostsPage
