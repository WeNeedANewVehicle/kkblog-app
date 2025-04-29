import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCommentApi } from '@/features/comments/api/comments.api'
import {
  GET_COMMENTS,
  UseGetInfiniteCommentsReturnType,
} from '@/features/comments/hooks/useGetInfiniteComents'
import { GET_CHILD_COMMENTS } from '@/features/comments/hooks/useGetInfiniteChildComments'
import useOrder from '@/common/hooks/useOrder'

const UPDATE_COMMENT = 'UPDATE_COMMENT'

function useUpdateComment() {
  const queryClient = useQueryClient()
  const order = useOrder()

  return useMutation({
    mutationKey: [UPDATE_COMMENT],
    mutationFn: updateCommentApi,
    onMutate: ({ content, id, postId, parentCommentId }) => {
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
                data: page.data.map((comment) =>
                  comment.id === id ? { ...comment, content } : comment
                ),
              }
            }),
            pageParams: oldData.pageParams.map((params) => params),
          }
        }
      )
    },
  })
}
export default useUpdateComment
