import { useMutation } from '@tanstack/react-query'
import { createCommentApi } from '@/features/comments/api/comments.api'

export const CREATE_COMMENT = 'CREATE_COMMENT'

function useCreateComment() {
  return useMutation({
    mutationKey: [CREATE_COMMENT],
    mutationFn: createCommentApi,
    onSuccess: () => {
      /* 댓글 작성 후 추가 */
    },
  })
}

export default useCreateComment
