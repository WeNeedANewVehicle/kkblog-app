import React, { useEffect } from 'react'
import { UsePostFormReturn } from './usePostForm'
import { GetPostResponseDto } from '../api/dto/get-post.dto'
import { UseFormSetFocus } from 'react-hook-form'
import { PostSchema } from '../schema/post.schema'

interface UseInitPostParams extends Pick<UsePostFormReturn, 'reset'> {
  id: string
  post?: GetPostResponseDto
  setFocus: UseFormSetFocus<PostSchema>
}
function useInitPost({ reset, post, id, setFocus }: UseInitPostParams) {
  useEffect(() => {
    setFocus('title')
    if (id) {
      reset({
        content: post?.content,
        desc: post?.desc,
        tags: post?.tags,
        title: post?.title,
        thumbnail: post?.thumbnail ? post.thumbnail : undefined,
      })
    }
  }, [id, post, reset])
}

export default useInitPost
