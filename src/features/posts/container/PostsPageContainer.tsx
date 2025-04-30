'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useInfiniteGetPosts from '@/features/posts/hooks/useInfiniteGetPosts'
import useGetPostsQuery from '@/features/posts/hooks/useGetPostsQuery'
import useMe from '@/features/auth/hooks/queries/useMe'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'
import PostList from '@/components/Post/PostList/PostList'
import QueryError from '@/components/ErrorMessage/QueryError'
import NoPost from '@/components/Post/NoPost/NoPost'

function PostsPageContainer() {
  const { register, onSubmit, onClear, formState, search } = useGetPostsQuery()

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
  } = useInfiniteGetPosts(search)
  const { data: me } = useMe()
  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage })

  const isNoResult = useMemo(() => posts?.pages.length === 1 && posts.pages[0].data.length === 0, [posts])
  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-20">
      <title>글 목록 | 크크블로그</title>
      <Search
        register={register}
        onSubmit={onSubmit}
        formState={formState}
        onClear={onClear}
      />

      <div className="flex w-full h-[4rem] justify-end">
        {me && (
          <Link href={route.posts.write} className="btn-black box-sm h-fit">
            글쓰기
          </Link>
        )}
      </div>

      <QueryError error={error} message="글 목록을 가져오는데 실패했습니다." />
      {!error && !isNoResult && <PostList posts={posts} isFetching={isFetching} />}
      <NoPost search={search} isNoResult={isNoResult}/>
      <div ref={ref} />
    </section>
  )
}

export default PostsPageContainer
