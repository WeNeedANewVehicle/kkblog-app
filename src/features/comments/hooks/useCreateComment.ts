import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCommentApi } from '@/features/comments/api/comments.api'
import { GetCommentsResponseDto } from '../api/dto/getComments.dto'

export const CREATE_COMMENT = 'CREATE_COMMENT'

function useCreateComment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [CREATE_COMMENT],
    mutationFn: createCommentApi,
    onSuccess: (res) => {
      const { data } = res
      queryClient.setQueryData<GetCommentsResponseDto>(
        [CREATE_COMMENT],
        (oldData) => {
          return oldData?.concat(data)
        }
      )
    },
  })
}

export default useCreateComment
