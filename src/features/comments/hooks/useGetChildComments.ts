import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'
import React from 'react'
import useGetInfiniteChildComments from './useGetInfiniteChildComments'

interface UseGetChildCommentsParams {
  commentId: string
  postId: string
  isEnabled: boolean
}

function useGetChildComments({
  commentId,
  postId,
  isEnabled,
}: UseGetChildCommentsParams) {
  const {
    data: childComments,
    isPending: isChildCommentsPending,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteChildComments({ commentId, postId, isEnabled })
  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage })

  return {
    ref,
    childComments,
    isChildCommentsPending,
  }
}

export default useGetChildComments
