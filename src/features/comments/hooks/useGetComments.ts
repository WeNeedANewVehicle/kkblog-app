import useGetInfiniteComments from '@/features/comments/hooks/useGetInfiniteComents'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'
import useOrder from '@/common/hooks/useOrder'

function useGetComments(postId: string) {
  const order = useOrder()

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
