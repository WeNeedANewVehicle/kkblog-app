import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { getPostsApi } from '@/features/posts/api/posts'

export const INFINITE_POSTS_PAGE_SIZE = 21
export const GET_INFINITE_POSTS = 'GET_INFINITE_POSTS'

export type UseInfiniteGetPostsReturnType = ReturnType<
  typeof useInfiniteGetPosts
>

function useInfiniteGetPostsQueryOptions(search: string | null) {
  const queryKey: unknown[] = [GET_INFINITE_POSTS]

  if (search) {
    queryKey.push({ search })
  }

  return infiniteQueryOptions({
    queryKey,
    queryFn: ({ pageParam }) =>
      getPostsApi(
        pageParam
          ? {
              cursor: pageParam,
              pageSize: INFINITE_POSTS_PAGE_SIZE,
              ...(search && { search }),
            }
          : { pageSize: INFINITE_POSTS_PAGE_SIZE, ...(search && { search }) }
      ),
    getNextPageParam: (lastPage, allPages) => lastPage.meta.paging?.nextCursor,
    initialPageParam: '',
  })
}

function useInfiniteGetPosts(search: string | null) {
  return useInfiniteQuery(useInfiniteGetPostsQueryOptions(search))
}

export default useInfiniteGetPosts
