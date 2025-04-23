import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { getChildCommentsApi } from '@/features/comments/api/comments.api'
import { ORDER_BY } from '@/common/constant/constant'

const GET_CHILD_COMMENTS = 'GET_CHILD_COMMENTS'
const GET_CHILD_COMMENTS_PAGE_SIZE = 12

interface UseGetChildCommentsParams {
  postId: string
  commentId: string
  isEnabled: boolean
}

export type UseGetInfiniteChildCommentsOptionReturnType = ReturnType<
  typeof useGetInfiniteChildComments
>

function useGetInfiniteChildCommentsOption({
  postId,
  commentId,
  isEnabled,
}: UseGetChildCommentsParams) {
  return infiniteQueryOptions({
    queryKey: [GET_CHILD_COMMENTS, { postId }, { commentId }],
    queryFn: ({ pageParam }) =>
      getChildCommentsApi({
        commentId,
        postId,
        pageSize: GET_CHILD_COMMENTS_PAGE_SIZE,
        order: ORDER_BY.ASC,
        ...(pageParam && { cursor: pageParam }),
      }),
    getNextPageParam: (lastPage, _) => lastPage.meta.paging?.nextCursor,
    initialPageParam: '',
    enabled: isEnabled && !!postId && !!commentId,
  })
}

function useGetInfiniteChildComments({
  postId,
  commentId,
  isEnabled,
}: UseGetChildCommentsParams) {
  return useInfiniteQuery(
    useGetInfiniteChildCommentsOption({ postId, commentId, isEnabled })
  )
}

export default useGetInfiniteChildComments
