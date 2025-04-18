'use client'

import Link from 'next/link'
import React, { Fragment, Suspense } from 'react'
import Search from '@/components/Search/Search'
import route from '@/routes/routes'
import useInfiniteGetPosts, { INFINITE_POSTS_PAGE_SIZE } from '@/features/posts/hooks/useInfiniteGetPosts'
import PostItem from '@/components/Post/PostItem/PostItem'
import useMe from '@/features/auth/hooks/queries/useMe'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'
import Loading from '@/../public/icons/loading.svg';
import PostItemSkeleton from '@/components/Post/PostItem/PostItemSkeleton/PostItemSkeleton'

function PostsPage() {
  const { data: posts, fetchNextPage, hasNextPage, isFetching } = useInfiniteGetPosts();
  const { data: me } = useMe()
  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage });
  
  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-20">
      <Search />

      <div className="flex w-full h-[4rem] justify-end">
        {me && (
          <Link href={route.posts.write} className="btn-black px-3 py-2.5 h-fit">
            글쓰기
          </Link>
        )}
      </div>

      <Suspense fallback={<Loading />}>
        <ul
          className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
        >
          {posts?.pages?.length === 0 && <li>아직 등록된 글이 없습니다.</li>}
          {posts?.pages.map((data, index) => {
            const key = `${index}-${data.meta.paging?.nextCursor}`
            return (
              <Fragment key={key} >
                {data.data.map((post) => <PostItem key={post.id} {...post} />)}
              </Fragment>
            )
          })}
          {isFetching && (Array.from({ length: INFINITE_POSTS_PAGE_SIZE }, (_, k) => <PostItemSkeleton key={k}/>))}
        </ul>
        <div ref={ref} />
      </Suspense>
    </section>
  )
}

export default PostsPage
