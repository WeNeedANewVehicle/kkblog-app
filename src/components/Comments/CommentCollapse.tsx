import React, { useMemo } from 'react'
import Button from '../Button/Button'
import CloseIcon from '@/../public/icons/close.svg'

interface CommentCollapseProps {
  commentCount: number
  isCollapsed: boolean
  onClick: () => void
}

function CommentCollapse({
  commentCount,
  isCollapsed,
  onClick,
}: CommentCollapseProps) {
  const replyText = useMemo(
    () => commentCount > 0 && `${commentCount}개의 답글 펼치기`,
    [commentCount]
  )
  if (commentCount <= 0) {
    return
  }

  return (
    <Button
      //
      className="flex gap-2 w-fit text-hyundai-gold dark:text-blink"
      onClick={onClick}
    >
      <span className="p-1 border-2">
        <CloseIcon
          className={`transition-transform ${isCollapsed && 'transform-[rotate(45deg)]'} stroke-2`}
        />
      </span>
      {isCollapsed ? replyText : '접기'}
    </Button>
  )
}

export default React.memo(CommentCollapse)
