'use client'
import React, { Fragment } from 'react'
import CommentItem from './CommentItem'
import { timeAgo } from '@/common/util/time.util'
import { UseGetInfiniteCommentsReturnType } from '@/features/comments/hooks/useGetInfiniteComents'
import useDomMutation from '@/common/hooks/useDomMutation'

interface CommentListProps {
  comments: UseGetInfiniteCommentsReturnType['data']
  postId: string
}

function CommentList({ comments, postId }: CommentListProps) {
  const ref = useDomMutation<HTMLUListElement>({
    childList: true,
  })

  return (
    <ul className="flex flex-col gap-4 pb-8" ref={ref}>
      {comments?.pages.map((page, index) => {
        const key = `${index}-${page.meta.paging?.nextCursor}`

        return (
          <Fragment key={key}>
            {page.data.map((comment) => (
              <CommentItem
                className="bg-gray-200 dark:bg-gray-800"
                depth={comment.depth}
                key={comment.id}
                id={comment.id}
                author={comment.author}
                content={comment.content}
                createdAt={timeAgo(comment.createdAt)}
                _count={comment?._count}
                postId={postId}
              />
            ))}
          </Fragment>
        )
      })}
    </ul>
  )
}

export default React.memo(CommentList)
