'use client'

import React from 'react'
import CommentForm from '@/components/Comments/CommentForm'
import HorizontalLine from '@/components/Line/Horizontal'
import QueryError from '@/components/ErrorMessage/QueryError'
import CommentList from '@/components/Comments/CommentList'
import { GetPostResponseDto } from '@/features/posts/api/dto/get-post.dto'
import useCommentForm from '@/features/comments/hooks/useCommentForm'
import useCreateComment from '@/features/comments/hooks/useCreateComment'
import CommentsPending from './CommentsPending'
import useGetComments from '@/features/comments/hooks/useGetComments'

interface CommentSectionProps {
  post: GetPostResponseDto
}

function CommentSection({ post }: CommentSectionProps) {
  const { ref, comments, commentsError, isCommentsPending } = useGetComments(
    post.id
  )

  const {
    mutateAsync: createComment,
    isPending,
    isError,
  } = useCreateComment({ postId: post.id })

  const { register, handleSubmit } = useCommentForm()
  const onSubmit = handleSubmit(async (values) => {
    await createComment(
      {
        ...values,
        postId: post.id,
      },
      {
        onSuccess: () => {},
      }
    )
  })

  return (
    <section className="pt-8">
      <h4 className="text-3xl py-8">
        {post._count?.comments
          ? `${post._count.comments} 개의 댓글이 있습니다.`
          : '아직 등록된 댓글이 없습니다.'}
      </h4>

      <div className="flex flex-col gap-4 py-4">
        <h2>댓글 작성</h2>
        <CommentForm
          isOpen={true}
          register={register}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </div>

      <HorizontalLine className="border-t-gray-600 mb-16" />
      <CommentsPending isPending={isCommentsPending} />
      <QueryError
        message="댓글 목록을 가져오지 못했습니다."
        error={commentsError}
      />
      {!commentsError && <CommentList comments={comments} postId={post.id} />}
      <div ref={ref} />
    </section>
  )
}

export default CommentSection
