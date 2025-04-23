'use client'

import React, { useCallback, useMemo, useState } from 'react'
import Button from '@/components/Button/Button'
import CommentForm from '@/components/Comments/CommentForm'
import { GetCommentsItemDto } from '@/features/comments/api/dto/getComments.dto'
import CloseIcon from '@/../public/icons/close.svg'
import CommentIcon from '@/../public/icons/comment.svg'
import ChildComments from './ChildComments'
import CommentsControl from './CommentsControl'
import useCreateComment from '@/features/comments/hooks/useCreateComment'
import useCommentForm from '@/features/comments/hooks/useCommentForm'
import LoadingIcon from '@/../public/icons/loading.svg'
import useGetChildComments from '@/features/comments/hooks/useGetChildComments'
import CommentTargetAuthorNickName from './CommentTargetAuthorNickName'

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
  parent,
}: CommentItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const { ref, childComments, isChildCommentsPending } = useGetChildComments({
    commentId: id,
    postId,
    isEnabled: !isCollapsed,
  })
  const { register, handleSubmit } = useCommentForm()

  const {
    mutateAsync: createComment,
    isPending,
    isError,
  } = useCreateComment({ postId, parentCommentId: id, setIsCollapsed })

  const onSubmit = handleSubmit(async (values) => {
    await createComment({
      ...values,
      postId,
      ...(id && { parentCommentId: id }),
    })
  })

  const hasReply = useMemo(() => _count && _count?.childs > 0, [_count])
  const replyText = useMemo(
    () => _count && _count?.childs > 0 && `${_count.childs}개의 답글 펼치기`,
    [_count]
  )

  const collapseReplyArea = useCallback(
    () => setIsCollapsed((state) => !state),
    []
  )

  return (
    <li className={`flex flex-col p-4 gap-4 ${className && className}`}>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          {author.nickname} <div className="text-gray-600">{createdAt}</div>
        </div>

        <CommentsControl author={author} />
      </div>
      <div className="flex flex-col whitespace-break-spaces">
        <p>
          <CommentTargetAuthorNickName depth={depth} parent={parent}/>
          {content}
        </p>

        <Button
          className="btn-black w-fit self-end px-3 py-1 rounded-none!"
          onClick={() => setIsOpen((state) => !state)}
        >
          <span className="hidden sm:inline">{isOpen ? '취소' : '답글'}</span>
          <CommentIcon className="sm:hidden" />
        </Button>
      </div>

      <CommentForm
        isOpen={isOpen}
        onSubmit={onSubmit}
        register={register}
        isPending={isPending}
      />

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

      <ChildComments
        comments={childComments}
        postId={postId}
        isCollapsed={isCollapsed}
      />

      <div ref={ref} />
    </li>
  )
}

export default React.memo(CommentItem)
