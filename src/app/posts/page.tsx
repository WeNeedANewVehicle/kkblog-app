'use client'

import Link from 'next/link'
import React, { Fragment, Suspense } from 'react'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useInfiniteGetPosts from '@/features/posts/hooks/useInfiniteGetPosts'

import useMe from '@/features/auth/hooks/queries/useMe'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'
import Loading from '@/../public/icons/loading.svg'

import PostList from '@/components/Post/PostList/PostList'
import { useRouter } from 'next/navigation'
import QueryError from '@/components/ErrorMessage/QueryError'

function PostsPage() {
  const router = useRouter()
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
  } = useInfiniteGetPosts()
  const { data: me } = useMe()
  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage })

  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-20">
      <Search />

      <div className="flex w-full h-[4rem] justify-end">
        {me && (
          <Link
            href={route.posts.write}
            className="btn-black px-3 py-2.5 h-fit"
          >
            글쓰기
          </Link>
        )}
      </div>

      <Suspense fallback={<Loading />}>
        <QueryError
          error={error}
          message="글 목록을 가져오는데 실패했습니다."
        />
        {!error && <PostList posts={posts} isFetching={isFetching} />}
        <div ref={ref} />
      </Suspense>
    </section>
  )
}

export default PostsPage
