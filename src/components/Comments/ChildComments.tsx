'use client'
import React, { Fragment, useRef } from 'react'
import CommentItem from './CommentItem'
import { timeAgo } from '@/common/util/time.util'
import { UseGetInfiniteChildCommentsOptionReturnType } from '@/features/comments/hooks/useGetInfiniteChildComments'

interface ChildCommentsProps {
  comments: UseGetInfiniteChildCommentsOptionReturnType['data']
  postId: string
  isCollapsed: boolean
}

function ChildComments({ comments, postId, isCollapsed }: ChildCommentsProps) {
  const ref = useRef<HTMLUListElement>(null)

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
            {page.data.map((comment) => (
              <CommentItem
                depth={comment.depth}
                // UI Nesting은 1뎁스까지만, 2뎁스부터는 1뎁스와 동일,
                className={`${comment.depth > 0 ? 'w-full pr-0' : ''} ${comment.depth > 1 ? 'pl-0 pb-0' : ''}`}
                key={comment.id}
                postId={postId}
                createdAt={timeAgo(comment.createdAt)}
                _count={comment._count}
                author={comment.author}
                content={comment.content}
                id={comment.id}
                parent={comment.parent}
              />
            ))}
          </Fragment>
        )
      })}
    </ul>
  )
}

export default React.memo(ChildComments)
