import { ORDER_BY } from '@/common/constant/constant'
import { getPostsApi } from '@/features/posts/api/posts'
import { useQueries } from '@tanstack/react-query'
import { getMainPageSummary } from '@/features/statistics/api/statistics.api'

const USE_GET_POSTS = 'USE_GET_POSTS'
const USE_GET_STATISTICS = 'USE_GET_STATISTICS'
function useGetMainPageSummary() {
  return useQueries({
    queries: [
      {
        queryKey: [USE_GET_POSTS],
        queryFn: () => getPostsApi({ pageSize: 5, order: ORDER_BY.DESC }),
      },
      {
        queryKey: [USE_GET_STATISTICS],
        queryFn: () => getMainPageSummary(),
      },
    ],
  })
}

export default useGetMainPageSummary
