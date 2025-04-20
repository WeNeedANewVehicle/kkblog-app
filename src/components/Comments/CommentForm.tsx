'use client'
import React, { useCallback } from 'react'
import useCreateComment from '@/features/comments/hooks/useCreateComment'
import useCommentForm from '@/features/comments/hooks/useCommentForm'
import Button from '@/components/Button/Button'

interface CommentFormProps {
  postId: string
  parentCommentId?: string
}
function CommentForm({ postId, parentCommentId }: CommentFormProps) {
  const { register, handleSubmit } = useCommentForm()
  const { mutateAsync: createComment } = useCreateComment()

  const onSubmit = 
    handleSubmit(async (values) => {
      await createComment({
        ...values,
        postId,
        ...(parentCommentId && { parentCommentId }),
      })
    });

  return (
    <div className="flex flex-col gap-4 py-4">
      <h2>댓글 작성</h2>
      <form className="flex flex-col gap-4 md:flex-row" onSubmit={onSubmit}>
        <textarea
          className="p-4 border-2 border-gray-800 w-full dark:bg-gray-800"
          {...register('content')}
        />
        <Button
          className="btn-black box-sm md:w-fit whitespace-nowrap"
          type="submit"
        >
          전송
        </Button>
      </form>
    </div>
  )
}

export default CommentForm
