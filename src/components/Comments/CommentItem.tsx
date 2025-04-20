import React from 'react'
import Button from '@/components/Button/Button'

interface CommentItemProps {
  content: string
}

function CommentItem({ content }: CommentItemProps) {
  return (
    <li className="flex flex-col p-4 gap-4 bg-gray-200 dark:bg-gray-800 ">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <div>author</div> |<div>createdAt</div>
        </div>

        <div className="flex gap-2">
          <Button className="icon-btn ">수정</Button>
          <Button className="icon-btn text-red-600">삭제</Button>
        </div>
      </div>
      <p>{content}</p>
    </li>
  )
}

export default CommentItem
