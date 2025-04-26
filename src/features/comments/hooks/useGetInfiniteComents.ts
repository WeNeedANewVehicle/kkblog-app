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
import { OrderBy } from '@/common/types/orderBy.type'

export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_COMMENTS_PAGE_SIZE = 12

interface UseGetChildCommentsParams {
  postId: string
  order: OrderBy | null
}

export type UseGetInfiniteCommentsReturnType = ReturnType<
  typeof useGetInfiniteComments
>

function useGetInfiniteCommentsOption({
  postId,
  order,
}: UseGetChildCommentsParams) {
  return infiniteQueryOptions({
    queryKey: [GET_COMMENTS, { postId }, { order }],
    queryFn: ({ pageParam }) =>
      getCommentsApi({
        postId,
        pageSize: GET_COMMENTS_PAGE_SIZE,
        ...(pageParam && { cursor: pageParam }),
        order: order ? order : ORDER_BY.ASC,
      }),
    getNextPageParam: (lastPage, _) => lastPage.meta.paging?.nextCursor,
    initialPageParam: '',
    enabled: !!postId,
  })
}

function useGetInfiniteComments({ postId, order }: UseGetChildCommentsParams) {
  return useInfiniteQuery(useGetInfiniteCommentsOption({ postId, order }))
}

export default useGetInfiniteComments
