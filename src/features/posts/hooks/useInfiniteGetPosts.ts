import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { getPostsApi } from '@/features/posts/api/posts'

export const INFINITE_POSTS_PAGE_SIZE = 21
export const GET_INFINITE_POSTS = 'GET_INFINITE_POSTS'

export type UseInfiniteGetPostsReturnType = ReturnType<
  typeof useInfiniteGetPosts
>

function useInfiniteGetPostsQueryOptions() {
  return infiniteQueryOptions({
    queryKey: [GET_INFINITE_POSTS],
    queryFn: ({ pageParam }) =>
      getPostsApi(
        pageParam
          ? { cursor: pageParam, pageSize: INFINITE_POSTS_PAGE_SIZE }
          : { pageSize: INFINITE_POSTS_PAGE_SIZE }
      ),
    getNextPageParam: (lastPage, allPages) => lastPage.meta.paging?.nextCursor,
    initialPageParam: '',
  })
}

function useInfiniteGetPosts() {
  return useInfiniteQuery({
    ...useInfiniteGetPostsQueryOptions(),
  })
}

export default useInfiniteGetPosts
