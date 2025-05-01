import React, { Fragment, useMemo } from 'react'
import PostItem from '../PostItem/PostItem'
import PostItemSkeleton from '../PostItem/PostItemSkeleton/PostItemSkeleton'
import {
  INFINITE_POSTS_PAGE_SIZE,
  UseInfiniteGetPostsReturnType,
} from '@/features/posts/hooks/useInfiniteGetPosts'

interface PostListProps {
  posts: UseInfiniteGetPostsReturnType['data']
  isFetching: UseInfiniteGetPostsReturnType['isFetching']
}

function PostList({ posts, isFetching }: PostListProps) {
  return (
    <ul
      className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
    >
      {posts?.pages.map((data, index) => {
        const key = `${index}-${data.meta.paging?.nextCursor}`
        return (
          <Fragment key={key}>
            {data.data.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
          </Fragment>
        )
      })}
      {isFetching &&
        Array.from({ length: INFINITE_POSTS_PAGE_SIZE }, (_, k) => (
          <PostItemSkeleton key={k} />
        ))}
    </ul>
  )
}

export default PostList
