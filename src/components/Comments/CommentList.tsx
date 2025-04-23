'use client'
import React, { Fragment } from 'react'
import CommentItem from './CommentItem'
import { timeAgo } from '@/common/util/time.util'
import { UseGetInfiniteCommentsReturnType } from '@/features/comments/hooks/useGetComments'

interface CommentListProps {
  comments: UseGetInfiniteCommentsReturnType['data']
  postId: string
}

function CommentList({ comments, postId }: CommentListProps) {
  return (
    <ul className="flex flex-col gap-4 pb-8">
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
