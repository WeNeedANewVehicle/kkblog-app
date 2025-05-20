import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCommentApi } from '@/features/comments/api/comments.api'
import { GET_COMMENTS } from '@/features/comments/hooks/useGetInfiniteComents'
import { GET_CHILD_COMMENTS } from './useGetInfiniteChildComments'
import { Dispatch, SetStateAction } from 'react'

export const CREATE_COMMENT = 'CREATE_COMMENT'

interface UseCreateCommentParams {
  postId: string
  parentCommentId?: string
  setIsCollapsed?: Dispatch<SetStateAction<boolean>>
}

function useCreateComment({
  postId,
  parentCommentId,
  setIsCollapsed,
}: UseCreateCommentParams) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [CREATE_COMMENT],
    mutationFn: createCommentApi,
    onSuccess: (res) => {
      const { data, meta, error } = res

      // 뎁스 댓글 or 무뎁스 댓글 쿼리키 무효화
      const invalidKey = parentCommentId
        ? [GET_CHILD_COMMENTS, { postId }, { commentId: parentCommentId }]
        : [GET_COMMENTS, { postId }]

      queryClient.invalidateQueries({
        queryKey: invalidKey,
      })
    },
    onMutate: () => {
      if (setIsCollapsed) {
        setIsCollapsed((_) => false)
      }
      //   queryClient.setQueryData<UseGetInfiniteCommentsReturnType['data']>(
      //     [GET_COMMENTS, { postId }],
      //     (oldData) => {

      //       if (!oldData) {
      //         return;
      //       }

      //       const result = {
      //         pages: oldData.pages.reduce((acc, cur) => {

      //         }, oldData.pages[0]),
      //         pageParams: oldData.pageParams.map(params => params)
      //       }

      //       console.log(result)
      //       return result;
      //     },
      //   )
      // }
    },
  })
}

export default useCreateComment
