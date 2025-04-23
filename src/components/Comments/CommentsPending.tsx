import React from 'react'
import LoadingIcon from '@/../public/icons/loading.svg'

interface CommentsPendingProps {
  isPending: boolean
}

function CommentsPending({ isPending }: CommentsPendingProps) {
  if (!isPending) {
    return
  }

  return (
    <div className="flex justify-center">
      <LoadingIcon width={64} height={64} />
    </div>
  )
}

export default CommentsPending
