'use client'

import Link from 'next/link'
import React, { useMemo } from 'react'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useGetPosts from '@/features/posts/hooks/useGetPosts'
import PostItem from '@/components/Post/PostItem/PostItem'
import useMe from '@/features/auth/hooks/queries/useMe'
import useGetPostsQuery from '@/features/posts/hooks/useGetPostsQuery'
import { GetPostsDto } from '@/features/posts/api/dto/get-post-list.dto'

function PostsPage() {
  const params = useGetPostsQuery()

  const { data: posts } = useGetPosts(
    `${params.toString()}&pageSize=1` as unknown as GetPostsDto
  )
  const { data: me } = useMe()

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

      {posts?.pages.map((data) => {
        return (
          <ul
            key={data.meta.paging?.cursor}
            className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
          >
            {data.data.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
          </ul>
        )
      })}
    </section>
  )
}

export default PostsPage
