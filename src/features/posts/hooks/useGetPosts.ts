import { queryOptions, useQuery } from '@tanstack/react-query'
import { getPostsApi } from '@/features/posts/api/posts'

export const GET_POSTS = 'GET_POSTS'

function useGetPostsQueryOptions() {
  return queryOptions({
    queryKey: [GET_POSTS],
    queryFn: getPostsApi,
  })
}

function useGetPosts() {
  return useQuery(useGetPostsQueryOptions())
}

export default useGetPosts
