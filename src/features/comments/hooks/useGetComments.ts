import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import React from 'react'
import {
  getChildCommentsApi,
  getCommentsApi,
} from '@/features/comments/api/comments.api'
import { ORDER_BY } from '@/common/constant/constant'

const GET_COMMENTS = 'GET_COMMENTS'
const GET_COMMENTS_PAGE_SIZE = 12

interface UseGetChildCommentsParams {
  postId: string
  isEnabled: boolean
}

export type UseGetInfiniteCommentsReturnType = ReturnType<
  typeof useGetInfiniteComments
>

function useGetInfiniteCommentsOption({
  postId,
  isEnabled,
}: UseGetChildCommentsParams) {
  return infiniteQueryOptions({
    queryKey: [GET_COMMENTS, { postId }],
    queryFn: ({ pageParam }) =>
      getCommentsApi({
        postId,
        pageSize: GET_COMMENTS_PAGE_SIZE,
        ...(pageParam && { cursor: pageParam }),
        order: ORDER_BY.ASC,
      }),
    getNextPageParam: (lastPage, _) => lastPage.meta.paging?.nextCursor,
    initialPageParam: '',
    enabled: isEnabled && !!postId,
  })
}

function useGetInfiniteComments({
  postId,
  isEnabled,
}: UseGetChildCommentsParams) {
  return useInfiniteQuery(useGetInfiniteCommentsOption({ postId, isEnabled }))
}

export default useGetInfiniteComments
