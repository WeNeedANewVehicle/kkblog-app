'use client'

import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import Button from '@/components/Button/Button'
import CommentForm from '@/components/Comments/CommentForm'
import { GetCommentsItemDto } from '@/features/comments/api/dto/getComments.dto'
import CloseIcon from '@/../public/icons/close.svg'
import CommentIcon from '@/../public/icons/comment.svg';
import useGetInfiniteChildComments from '@/features/comments/hooks/useGetChildComments'
import ChildComments from './ChildComments'
import CommentsControl from './CommentsControl'
import useInfiniteScroll from '@/common/hooks/useInfiniteScroll'

interface CommentItemProps extends GetCommentsItemDto {
  postId: string
  className?: string
}

function CommentItem({
  content,
  author,
  createdAt,
  _count,
  id,
  postId,
  className,
  depth,
  parent
}: CommentItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  
  const { data: childComments, hasNextPage, fetchNextPage } = useGetInfiniteChildComments({
    commentId: id,
    postId,
    isEnabled: !isCollapsed, // 댓글 창이 펼쳐져 있을 때 추가 데이터 가져오기
  })

  const ref = useInfiniteScroll<HTMLDivElement>({ hasNextPage, fetchNextPage })

  const hasReply = useMemo(() => _count && _count?.childs > 0, [_count?.childs])
  const replyText = useMemo(
    () => _count && _count?.childs > 0 && `${_count.childs}개의 답글 펼치기`,
    [_count]
  )

  const collapseReplyArea = useCallback(
    () => setIsCollapsed((state) => !state),
    []
  )

  return (
    <li
      className={`flex flex-col p-4 gap-4 ${className && className}`}
    >
      <div className="flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          {author.nickname} <div className="text-gray-600">{createdAt}</div>
        </div>

        <CommentsControl author={author} />
      </div>
      <div className="flex flex-col whitespace-break-spaces">
        <p>
        <span className='text-hyundai-gold dark:text-blink'>{depth > 0 && `@${parent?.author.nickname} `}</span>
        {content}
        </p>
       

        <Button
          className="btn-black w-fit self-end px-3 py-1 rounded-none!"
          onClick={() => setIsOpen((state) => !state)}
        >
          <span className="hidden sm:inline">{isOpen ? '취소' : '답글'}</span>
          <CommentIcon className="sm:hidden"/>
        </Button>
      </div>

      {isOpen && <CommentForm postId={postId} parentCommentId={id} />}

      {hasReply && (
        <Button
          //
          className="flex gap-2 w-fit text-hyundai-gold dark:text-blink"
          onClick={collapseReplyArea}
        >
          <span className="p-1 border-2">
            <CloseIcon
              className={`transition-transform ${isCollapsed && 'transform-[rotate(45deg)]'} stroke-2`}
            />
          </span>
          {isCollapsed ? replyText : '접기'}
        </Button>
      )}

      {!isCollapsed && (
        <ChildComments comments={childComments} postId={postId} />
      )}
      <div ref={ref}/>
    </li>
  )
}

export default React.memo(CommentItem)
