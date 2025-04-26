'use client'

import React, { useMemo } from 'react'
import CommentForm from '@/components/Comments/CommentForm'
import QueryError from '@/components/ErrorMessage/QueryError'
import CommentList from '@/components/Comments/CommentList'
import { GetPostResponseDto } from '@/features/posts/api/dto/get-post.dto'
import useCommentForm from '@/features/comments/hooks/useCommentForm'
import useCreateComment from '@/features/comments/hooks/useCreateComment'
import CommentsPending from './CommentsPending'
import useGetComments from '@/features/comments/hooks/useGetComments'
import CommentsOrderOption from './CommentsOrderOption'
import CursorPagingButton from '../Button/CursorPagingButton'
import CommentCount from './CommentCount'

interface CommentSectionProps {
  post: GetPostResponseDto
}

function CommentSection({ post }: CommentSectionProps) {
  const {
    comments,
    commentsError,
    isCommentsPending,
    hasNextPage,
    fetchNextPage,
  } = useGetComments(post.id)

  const {
    mutateAsync: createComment,
    isPending,
    isError,
  } = useCreateComment({ postId: post.id })

  const { register, handleSubmit, setValue, formState } = useCommentForm()

  const onSubmit = handleSubmit(async (values) => {
    await createComment({
      ...values,
      postId: post.id,
    }, {
      onSuccess: () => {
        setValue('content', '')
      },
      onError: (err) => {
        alert(err);
      }
    })
  })

  const isCommentPending = useMemo(() => isPending || formState.isSubmitting,[isPending, formState.isSubmitting])

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 py-8">
        <h2 className="text-2xl">댓글 작성</h2>
        <CommentForm
          isOpen={true}
          register={register}
          onSubmit={onSubmit}
          isPending={isCommentPending}
        />
      </div>

      <div className="flex justify-between items-center">
        <CommentCount count={post._count.comments} />
        <CommentsOrderOption />
      </div>

      <CommentsPending isPending={isCommentsPending} />
      <QueryError
        message="댓글 목록을 가져오지 못했습니다."
        error={commentsError}
      />

      {!commentsError && <CommentList comments={comments} postId={post.id} />}

      <CursorPagingButton
        fetchNextPage={fetchNextPage}
        isLoading={isCommentsPending}
        hasNextPage={hasNextPage}
      >
        {!hasNextPage && !isPending ? '모든 댓글을 확인했습니다' : '더 보기'}
      </CursorPagingButton>
    </section>
  )
}

export default CommentSection
