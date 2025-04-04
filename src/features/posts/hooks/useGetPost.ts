import { queryOptions, useQuery } from '@tanstack/react-query'
import { getPostApi } from '@/features/posts/api/posts'

export const GET_POST = 'GET_POST'

function useGetPostQueryOptions(id: string) {
  return queryOptions({
    queryKey: [GET_POST],
    queryFn: () => getPostApi(id),
  })
}

function useGetPost(id: string) {
  return useQuery(useGetPostQueryOptions(id))
}

export default useGetPost
