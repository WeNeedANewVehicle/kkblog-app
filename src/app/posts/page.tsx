'use client'

import Link from 'next/link'
import React, { Fragment, Suspense, useEffect, useRef } from 'react'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useInfiniteGetPosts from '@/features/posts/hooks/useInfiniteGetPosts'
import PostItem from '@/components/Post/PostItem/PostItem'
import useMe from '@/features/auth/hooks/queries/useMe'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'

function PostsPage() {
  const { data: posts, fetchNextPage, hasNextPage } = useInfiniteGetPosts();
  const { data: me } = useMe()
  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage });
  
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

      <Suspense>
        <ul
          className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
        >
          {posts?.pages.map((data) => {
            const key = `${new Date().getTime()}-${data.meta.paging?.nextCursor}`
            return (
              <Fragment key={key} >
                {data.data.map((post) => <PostItem key={post.id} {...post} />)}
              </Fragment>
            )
          })}
        </ul>
        <div ref={ref} />
      </Suspense>
    </section>
  )
}

export default PostsPage
