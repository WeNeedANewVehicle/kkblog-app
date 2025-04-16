import React, { useEffect } from 'react'
import { UsePostFormReturn } from './usePostForm'
import { GetPostResponseDto } from '../api/dto/get-post.dto'

interface UseInitPostParams extends Pick<UsePostFormReturn, 'reset'> {
  id: string
  post?: GetPostResponseDto
}
function useInitPost({ reset, post, id }: UseInitPostParams) {
  useEffect(() => {
    if (id) {
      reset(post)
    }
  }, [id, post, reset])
}

export default useInitPost
