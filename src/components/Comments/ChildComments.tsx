'use client'
import React, { Fragment, useRef } from 'react'
import CommentItem from './CommentItem'
import { timeAgo } from '@/common/util/time.util'
import { UseGetInfiniteChildCommentsOptionReturnType } from '@/features/comments/hooks/useGetInfiniteChildComments'
import useDeleteCommentModal from '@/features/comments/hooks/useDeleteCommentModal'

interface ChildCommentsProps {
  comments: UseGetInfiniteChildCommentsOptionReturnType['data']
  postId: string
  isCollapsed: boolean
}

function ChildComments({ comments, postId, isCollapsed }: ChildCommentsProps) {
  const ref = useRef<HTMLUListElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { onOpenDeleteCommentModal } = useDeleteCommentModal()

  if (isCollapsed) {
    return
  }

  return (
    <ul
      className={`flex flex-col gap-2 transition-all animate-blink-bg `}
      ref={ref}
      onAnimationEnd={() => ref.current?.classList.remove('animate-blink-bg')}
    >
      {comments?.pages.map((page, index) => {
        const key = `${index}-${page.meta.paging?.nextCursor}`

        return (
          <Fragment key={key}>
            {page.data.map(
              ({ depth, createdAt, id, parentCommentId, ...rest }) => (
                <CommentItem
                  key={id}
                  id={id}
                  // UI Nesting은 1뎁스까지만, 2뎁스부터는 1뎁스와 동일,
                  className={`${depth > 0 ? 'w-full pr-0' : ''} ${depth > 1 ? 'pl-0 pb-0' : ''}`}
                  depth={depth}
                  postId={postId}
                  createdAt={timeAgo(createdAt)}
                  onOpenDeleteModal={() =>
                    onOpenDeleteCommentModal({ id, postId, parentCommentId })
                  }
                  {...rest}
                />
              )
            )}
            <div ref={scrollRef} />
          </Fragment>
        )
      })}
    </ul>
  )
}

export default React.memo(ChildComments)
