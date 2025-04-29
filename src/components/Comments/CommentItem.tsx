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
import useUpdateComment from '@/features/comments/hooks/useUpdateComment'
import { useAppContext } from '../Providers/hooks/useAppContext'
import CommentCollapse from './CommentCollapse'

interface CommentItemProps extends GetCommentsItemDto {
  postId: string
  className?: string
  onOpenDeleteModal: () => void
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
  parentCommentId,
  onOpenDeleteModal,
}: CommentItemProps) {
  // 댓글 수정 시  폼 편집 모드 활성화 여부
  const [isEdit, setIsEdit] = useState(false)
  // 답글 영역 폼 열림 여부
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false)
  // 답글 목록 접힙/열림 여부
  const [isCollapsed, setIsCollapsed] = useState(true)

  const { user } = useAppContext()

  const { ref, childComments, isChildCommentsPending } = useGetChildComments({
    commentId: id,
    postId,
    isEnabled: !isCollapsed,
  })
  const { register, handleSubmit, setValue } = useCommentForm()

  const { mutateAsync: createComment, isPending } = useCreateComment({
    postId,
    parentCommentId: id,
    setIsCollapsed,
  })

  const { mutateAsync: updateComment } = useUpdateComment()

  // 답글 생성
  const onSubmit = handleSubmit(async (values) => {
    await createComment(
      {
        ...values,
        postId,
        ...(id && { parentCommentId: id }), // 댓글 id 가 존재할 경우는 답글을 다는 경우
      },
      {
        onSuccess: () => {
          setValue('content', '')
          setIsCommentFormOpen(false)
        },
      }
    )
  })

  // 작성된 댓글 편집 폼 열기
  const onOpenCommentEditForm = useCallback(() => {
    if (author.id && user && author.id !== user?.id) {
      return
    }
    setIsEdit(true)
    setValue('id', id)
    setValue('content', content)
    setValue('parentCommentId', parentCommentId)
  }, [id, content, parentCommentId, setValue])

  const onCloseCommentEditForm = useCallback(() => setIsEdit(false), [])

  // 댓글 수정 후 제출
  const onEditComment = handleSubmit(async (values) => {
    await updateComment(
      {
        id: values.id!,
        postId,
        content: values.content,
        parentCommentId: values.parentCommentId,
      },
      {
        onSuccess: () => {
          setIsEdit(false)
        },
      }
    )
  })

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

        <CommentsControl
          author={author}
          isEdit={isEdit}
          onEdit={isEdit ? onCloseCommentEditForm : onOpenCommentEditForm}
          onDelete={onOpenDeleteModal}
        />
      </div>
      <div className="flex flex-col whitespace-break-spaces">
        <p>
          <CommentTargetAuthorNickName depth={depth} parent={parent} />
          {!isEdit && content}
        </p>
        {/* 댓글 수정 폼 */}
        <CommentForm
          //
          isOpen={isEdit}
          onSubmit={onEditComment}
          register={register}
          isPending={isPending}
        />

        {!isEdit && (
          <Button
            className="btn-black w-fit self-end px-3 py-1 rounded-none!"
            onClick={() => setIsCommentFormOpen((state) => !state)}
          >
            <span className="hidden sm:inline">
              {isCommentFormOpen ? '취소' : '답글'}
            </span>
            {isCommentFormOpen ? (
              <CloseIcon className="[&>path]:stroke-2 sm:hidden" />
            ) : (
              <CommentIcon className="[&>path]:stroke-2 sm:hidden" />
            )}
          </Button>
        )}
      </div>

      {/** 답글 작성 폼 */}
      <CommentForm
        isOpen={isCommentFormOpen}
        onSubmit={onSubmit}
        register={register}
        isPending={isPending}
      />

      {/** 답글 펼치기 & 접기 */}
      <CommentCollapse
        commentCount={_count?.childs ?? 0}
        onClick={collapseReplyArea}
        isCollapsed={isCollapsed}
      />

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
