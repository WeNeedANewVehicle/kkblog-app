'use client'

import React from 'react'
import CommentForm from '@/components/Comments/CommentForm'
import HorizontalLine from '@/components/Line/Horizontal'
import QueryError from '@/components/ErrorMessage/QueryError'
import CommentList from '@/components/Comments/CommentList'
import { GetPostResponseDto } from '@/features/posts/api/dto/get-post.dto'
import useGetInfiniteComments from '@/features/comments/hooks/useGetComments'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'

interface CommentSectionProps {
    post: GetPostResponseDto
}

function CommentSection({ post }: CommentSectionProps) {


  const { data: comments, error, hasNextPage, fetchNextPage  } = useGetInfiniteComments({ postId: post.id, isEnabled: true });
  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage })

  return (
    <section className="pt-8">
        <h4 className="text-3xl py-8">
          {post._count?.comments
            ? `${post._count.comments} 개의 댓글이 있습니다.`
            : '아직 등록된 댓글이 없습니다.'}
        </h4>

        <div className="flex flex-col gap-4 py-4">
          <h2>댓글 작성</h2>
          <CommentForm postId={post.id} />
        </div>

        <HorizontalLine className="border-t-gray-600 mb-16" />

        {error && (
          <QueryError message="댓글 목록을 가져오지 못했습니다." />
        )}
        {!error && <CommentList comments={comments} postId={post.id}/>}
        <div ref={ref}/>
      </section>
  )
}

export default CommentSection