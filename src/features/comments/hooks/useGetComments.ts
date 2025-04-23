import useGetInfiniteComments from '@/features/comments/hooks/useGetInfiniteComents'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'

function useGetComments(postId: string) {
  const {
    data: comments,
    isPending: isCommentsPending,
    error: commentsError,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteComments({ postId })

  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage })

  return {
    ref,
    comments,
    isCommentsPending,
    commentsError,
  }
}

export default useGetComments
