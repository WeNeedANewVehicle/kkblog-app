import React from 'react'
import CommentItem from './CommentItem'
import { GetCommentsResponseDto } from '@/features/comments/api/dto/getComments.dto'

interface CommentListProps {
  comments: GetCommentsResponseDto
}

function CommentList({ comments }: CommentListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </ul>
  )
}

export default CommentList
