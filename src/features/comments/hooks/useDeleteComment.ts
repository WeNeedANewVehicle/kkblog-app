import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCommentApi } from '@/features/comments/api/comments.api'
import { GET_CHILD_COMMENTS } from './useGetInfiniteChildComments'
import { GET_COMMENTS, UseGetInfiniteCommentsReturnType } from './useGetInfiniteComents'
import useOrder from '@/common/hooks/useOrder'

const DELETE_COMMENT = 'DELETE_COMMENT'

function useDeleteComment() {
  const queryClient = useQueryClient()
  const order = useOrder()

  return useMutation({
    mutationKey: [DELETE_COMMENT],
    mutationFn: deleteCommentApi,
    onMutate: ({ id, postId, parentCommentId }) => {
      const queryKey: unknown[] = [
        parentCommentId ? GET_CHILD_COMMENTS : GET_COMMENTS,
        { postId },
        { order },
      ]

      // 자식 댓글은 정렬을 제어하지 않음
      if (parentCommentId) {
        queryKey.pop()
        queryKey.push({ commentId: parentCommentId })
      }

      // optimistic update
      queryClient.setQueryData<UseGetInfiniteCommentsReturnType['data']>(
        queryKey,
        (oldData) => {
          if (!oldData) {
            return
          }

          return {
            pages: oldData.pages.map((page) => {
              return {
                ...page,
                data: page.data.filter((comment) => comment.id !== id),
              }
            }),
            pageParams: oldData.pageParams.map((params) => params),
          }
        }
      )

    }
  })
}

export default useDeleteComment
