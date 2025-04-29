'use client'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import CommentItem from './CommentItem'
import { timeAgo } from '@/common/util/time.util'
import { UseGetInfiniteCommentsReturnType } from '@/features/comments/hooks/useGetInfiniteComents'
import useOrder from '@/common/hooks/useOrder'
import useDeleteCommentModal from '@/features/comments/hooks/useDeleteCommentModal'

interface CommentListProps {
  comments: UseGetInfiniteCommentsReturnType['data']
  postId: string
}

function CommentList({ comments, postId }: CommentListProps) {
  const ref = useRef<HTMLUListElement>(null)
  const order = useOrder()
  const { onOpenDeleteCommentModal } = useDeleteCommentModal()

  return (
    <ul className="flex flex-col gap-4 " ref={ref}>
      {comments?.pages.map((page, index) => {
        const key = `${index}-${page.meta.paging?.nextCursor}`

        return (
          <Fragment key={key}>
            {page.data.map(({ id, createdAt, ...rest }) => (
              <CommentItem
                className="bg-gray-200 dark:bg-gray-800"
                key={id}
                id={id}
                postId={postId}
                createdAt={timeAgo(createdAt)}
                onOpenDeleteModal={() => onOpenDeleteCommentModal({id, postId })}
                {...rest}
              />
            ))}
          </Fragment>
        )
      })}
    </ul>
  )
}

export default React.memo(CommentList)
