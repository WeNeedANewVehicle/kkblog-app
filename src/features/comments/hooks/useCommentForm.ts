import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  CommentSchema,
  commentSchema,
} from '@/features/comments/schema/comment.schema'

export type UseCommentFormReturn = ReturnType<typeof useCommentForm>

function useCommentForm() {
  const { formState, register, setError, handleSubmit } =
    useForm<CommentSchema>({
      resolver: zodResolver(commentSchema),
    })

  return {
    formState,
    register,
    setError,
    handleSubmit,
  }
}

export default useCommentForm
