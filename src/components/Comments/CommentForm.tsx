'use client'
import React, { FormEvent } from 'react'

import Button from '@/components/Button/Button'
import { UseCommentFormReturn } from '@/features/comments/hooks/useCommentForm'

export interface CommentFormProps {
  register: UseCommentFormReturn['register']
  onSubmit: (e: FormEvent) => void
  isPending: boolean
  isOpen: boolean
}

function CommentForm({
  register,
  isPending,
  isOpen,
  onSubmit,
}: CommentFormProps) {
  if (!isOpen) {
    return
  }

  return (
    <form className="flex flex-col gap-4 md:flex-row" onSubmit={onSubmit}>
      <textarea
        className="bg-white p-4 w-full border-2 border-black dark:border-none dark:bg-gray-700"
        disabled={isPending}
        {...register('content', { shouldUnregister: true })}
      />
      <Button
        className="btn-black box-sm md:w-fit whitespace-nowrap"
        type="submit"
        isLoading={isPending}
      >
        전송
      </Button>
    </form>
  )
}

export default React.memo(CommentForm)
