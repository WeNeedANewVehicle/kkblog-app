'use client'
import React, { useCallback } from 'react'
import useCreateComment from '@/features/comments/hooks/useCreateComment'
import useCommentForm from '@/features/comments/hooks/useCommentForm'
import Button from '@/components/Button/Button'

export interface CommentFormProps {
  postId: string
  parentCommentId?: string
}

function CommentForm({ postId, parentCommentId }: CommentFormProps) {
  const { register, handleSubmit } = useCommentForm()
  const { mutateAsync: createComment } = useCreateComment()

  const onSubmit = handleSubmit(async (values) => {
    await createComment({
      ...values,
      postId,
      ...(parentCommentId && { parentCommentId }),
    })
  })

  return (
    <form className="flex flex-col gap-4 md:flex-row" onSubmit={onSubmit}>
      <textarea
        className="bg-white p-4 w-full border-2 border-black dark:border-none dark:bg-gray-700"
        {...register('content')}
      />
      <Button
        className="btn-black box-sm md:w-fit whitespace-nowrap"
        type="submit"
      >
        전송
      </Button>
    </form>
  )
}

export default CommentForm
