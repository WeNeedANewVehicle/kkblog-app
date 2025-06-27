import { queryOptions, useQuery } from '@tanstack/react-query'
import { getMyPost } from '@/features/posts/api/posts'

export const GET_MY_POST = 'GET_MY_POST'

function useGetMyPostQueryOptions(id: string) {
  return queryOptions({
    queryKey: [GET_MY_POST],
    queryFn: () => getMyPost(id),
    enabled: Boolean(id)
  })
}

function useGetMyPost(id: string) {
  return useQuery(useGetMyPostQueryOptions(id))
}

export default useGetMyPost
