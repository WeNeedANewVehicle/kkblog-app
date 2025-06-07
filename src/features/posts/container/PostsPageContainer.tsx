'use client'

import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useInfiniteGetPosts from '@/features/posts/hooks/useInfiniteGetPosts'
import useGetPostsQuery from '@/features/posts/hooks/useGetPostsQuery'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'
import PostList from '@/components/Post/PostList/PostList'
import QueryError from '@/components/ErrorMessage/QueryError'
import NoPost from '@/components/Post/NoPost/NoPost'
import { useAppContext } from '@/components/Providers/hooks/useAppContext'
import SearchAutoSuggestionResult from '../../tags/components/SearchAutoSuggestionResult'
import useGetAutoSuggestionTags, { GET_AUTO_SUGGESTION_TAGS } from '@/features/tags/hooks/useGetAutoSuggestionTags'
import useMutateAutoSuggestionTags from '@/features/tags/hooks/useMutateAutoSuggestionTags'

function PostsPageContainer() {
  const { user } = useAppContext()
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { register, onSubmit, onClear, formState, search, watch } = useGetPostsQuery();

  const { data: tags } = useGetAutoSuggestionTags({ search: watch('search') })
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
  } = useInfiniteGetPosts(search)

  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage })

  const { mutateAsync: getTags } = useMutateAutoSuggestionTags()

  const searchTags = useCallback(async (e: ChangeEvent<HTMLInputElement>) => await getTags({ search: e.target.value }), [getTags])

  const isNoResult = useMemo(
    () => posts?.pages.length === 1 && posts.pages[0].data.length === 0,
    [posts]
  )


  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-20">
      <title>글 목록 | 크크블로그</title>
      <article className='w-full'>
        <Search
          register={register}
          onSubmitForm={onSubmit}
          formState={formState}
          onClear={onClear}
          onFocus={() => setIsCollapsed(false)}
          onBlur={() => setIsCollapsed(true)}
          onChange={searchTags}
        />
        <SearchAutoSuggestionResult isCollapsed={isCollapsed} tags={tags?.data ?? []} />
      </article>
      

      <div className="flex w-full h-[4rem] justify-end">
        {user?.permissions.posts.create && (
          <Link href={route.posts.write} className="btn-black box-sm h-fit">
            글쓰기
          </Link>
        )}
      </div>

      <QueryError error={error} message="글 목록을 가져오는데 실패했습니다." />
      {!error && !isNoResult && (
        <PostList posts={posts} isFetching={isFetching} />
      )}
      <NoPost search={search} isNoResult={isNoResult} />
      <div ref={ref} />
    </section>
  )
}

export default PostsPageContainer
