import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { getPostsApi } from '@/features/posts/api/posts'
import { GetPostsDto } from '@/features/posts/api/dto/get-post-list.dto'

export const GET_POSTS = 'GET_POSTS'

function useGetPostsQueryOptions(params: GetPostsDto) {
  return infiniteQueryOptions({
    queryKey: [GET_POSTS],
    queryFn: () => getPostsApi(params),
    getNextPageParam: (lastPage, allPages) => lastPage.meta.paging?.cursor,
    initialPageParam: undefined,
  })
}

function useGetPosts(params: GetPostsDto) {
  return useInfiniteQuery({
    ...useGetPostsQueryOptions(params),
  })
}

export default useGetPosts
