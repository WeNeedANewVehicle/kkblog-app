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

export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_COMMENTS_PAGE_SIZE = 12

interface UseGetChildCommentsParams {
  postId: string
}

export type UseGetInfiniteCommentsReturnType = ReturnType<
  typeof useGetInfiniteComments
>

function useGetInfiniteCommentsOption({ postId }: UseGetChildCommentsParams) {
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
    enabled: !!postId,
  })
}

function useGetInfiniteComments({ postId }: UseGetChildCommentsParams) {
  return useInfiniteQuery(useGetInfiniteCommentsOption({ postId }))
}

export default useGetInfiniteComments
