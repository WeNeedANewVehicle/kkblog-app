import React from 'react'

interface CommentCountProps {
  count: number
}
function CommentCount({ count }: CommentCountProps) {
  return (
    <h4 className="text-2xl py-8">
      {count ? `${count} 개의 댓글` : '아직 등록된 댓글이 없습니다.'}
    </h4>
  )
}

export default CommentCount
