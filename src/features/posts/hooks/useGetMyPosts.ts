import { queryOptions, useQuery } from '@tanstack/react-query'
import { getMyPosts } from '@/features/posts/api/posts'
import { GetMyPostsDto } from '@/features/posts/api/dto/getMyPosts.dto'

export const GET_MY_POSTS = 'GET_MY_POSTS'

function useGetMyPostsQueryOptions(dto: GetMyPostsDto) {
  return queryOptions({
    queryKey: [GET_MY_POSTS],
    queryFn: () => getMyPosts(dto),
  })
}

function useGetMyPosts(dto: GetMyPostsDto) {
  return useQuery(useGetMyPostsQueryOptions(dto))
}

export default useGetMyPosts
