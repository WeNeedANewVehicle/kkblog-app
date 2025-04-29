import useGetInfiniteComments from '@/features/comments/hooks/useGetInfiniteComents'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'
import useOrder from '@/common/hooks/useOrder'
import { ORDER_BY } from '@/common/constant/constant'

function useGetComments(postId: string) {
  const order = useOrder(ORDER_BY.ASC)

  const {
    data: comments,
    isPending: isCommentsPending,
    error: commentsError,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteComments({ postId, order })

  return {
    comments,
    isCommentsPending,
    commentsError,
    hasNextPage,
    fetchNextPage,
  }
}

export default useGetComments
