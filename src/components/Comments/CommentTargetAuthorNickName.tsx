import { GetCommentsItemDto } from '@/features/comments/api/dto/getComments.dto'
import React from 'react'

interface CommentTargetAuthorNickName
  extends Pick<GetCommentsItemDto, 'parent' | 'depth'> {}
function CommentTargetAuthorNickName({
  depth,
  parent,
}: CommentTargetAuthorNickName) {
  return (
    <span className="text-hyundai-gold dark:text-blink">
      {depth > 0 && `@${parent?.author.nickname} `}
    </span>
  )
}

export default CommentTargetAuthorNickName
